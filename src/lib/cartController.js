const getItemInCart = (state, id) => state.cart.findIndex(item => item.id === id)

export function add (state, id) {
  const item = state.items
  if (!item) throw new Error(`No item with id ${id}`)
  const cartIndex = getItemInCart(state, id)
  /* TODO: Immutable.js would be nice here, but I don't have an network connection
   * right now.
   */
  if (cartIndex > -1) {
    state.cart[cartIndex].count += 1
  } else {
    state.cart.push(Object.assign({ count: 0 }, item))
  }

  return state
}

export function remove (state, id) {
  const cartIndex = getItemInCart(state)
  if (cartIndex === -1) throw new Error('No such item in cart (${id})')

  if (state.cart[cartIndex].count < 2) {
    state.cart.splice(cartIndex, 1)
  } else {
    state.cart[cartIndex] -= 1
  }

  return state
}

