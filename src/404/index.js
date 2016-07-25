import _404View from './view.pug'

/* All routes are curried functions that take two arguments, an object
 * containing dependencies and a state object. The latter actually isn't used
 * here, but I'm still passing everything in state to the template. Just for
 * the sake of consistency.
 */
export default ({ cart }) => state => {
  /* Every component has to return an object that must return an object that
   * must at least have a property `render`. This should be a function that
   * should return a string of HTML. It may also have a `afterRender`
   * property. The first should be a function that sets up event-
   * listeners and the latter should remove them. The `components` array is
   * an array of compontents. The hooks of these objects will automatically be
   * called.
   */
  const cartC = cart(state)
  return {
    render: () => _404View(Object.assign(state, { cart: cartC.render() })),
    components: [cartC]
  }
}

