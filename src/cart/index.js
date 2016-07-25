import { Observable as O } from 'rx'
import { DOM } from 'rx-dom'

import cartView from './view.pug'

export default ({ cartController, navigate }) => (state, state$) => ({
  render: () => cartView(state),
  afterRender: container => {
    const clicks$ =
      Array.from(container.querySelectorAll('.cartItems__less'))
        .map(el => DOM.click(el))
        .takeUntil(navigate())
    O.merge(clicks$)
      .map(e => e.target.parentNode.dataset.id)
      .subscribeOnNext(id => {
        state$.onNext(cartController.remove(state, id))
      })
  }
})

