import { Observable as O } from 'rx'
/* rx-dom is usually imported with `import 'rx-dom'`, but this is mode readable
 * IMO.
 */
import { DOM } from 'rx-dom'

import shopView from './view.pug'

export default ({ cartController, navigate, cart }) => (state, state$) => ({
  render: () => shopView(state),
  afterRender: container => {
    const add$ =
      Array.from(container.querySelectorAll('.item__add'))
        .map(el => DOM.click(el))
    O.merge(add$)
      .map(e => e.target.parentNode.dataset.id)
      /* Terminate the observable when a navigation occurs. This will also
       * remove the set event-listeners
       */
      .takeUntil(navigate())
      .subscribeOnNext(id => {
        /* This is kinda fancy. When a button is pressed, a new state is
         * generated using the `cartController.add`. That is then passed as a
         * new value to the `state$` subject, which in turn triggers a
         * rerender.
         */
        state$.onNext(cartController.add(state, id))
      })
  }
})

