/* Right now eventlisteners have to be cleaned up by the components them selfs
 * it would be nicer if they could just use a hook for that.
 */

import layoutView from './view.pug'
import './styles.css'

const callAfterRender = container => component => {
  if (component.afterRender) component.afterRender(container)
  if (component.components) component.components.forEach(callAfterRender(container))
}

export default (container, navigation) => content$ => {
  content$.subscribe(
    /* Whenever something is sent through `content$` I throw it into the DOM.
     * This could easily be replaced with some virtual-dom implementation. But
     * since this is such a small app, I don't think it's really necessary.
     */
    component => {
      container.innerHTML = layoutView({ content: component.render(), navigation })
      callAfterRender(container)(component)
    },
    err => {
      console.error('An unexpected error occured!')
      console.error(err)
    },
    /* This is called when `content$` completes, which should never happen. */
    () => console.log('This should never happen')
  )
}

