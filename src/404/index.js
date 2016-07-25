import _404View from 'view.pug'

/* All routes are curried functions that take two arguments, an object
 * containing dependencies and a state object. The latter actually isn't used
 * here, but I'm still passing everything in state to the template. Just for
 * the sake of consistency.
 */
export default ({ cart }) => state =>
  _404View(Object.assign(state, { cart }))

