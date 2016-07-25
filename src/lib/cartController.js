const getItem = (arr, id) => arr.findIndex(item => item.id.toString() === id.toString())

export const add = (state, id) => {
  const itemIndex = getItem(state.items, id)
  if (itemIndex < 0) throw new Error(`No item with id ${id}`)
  const cartIndex = getItem(state.cart, id)
  /* TODO: Immutable.js would be nice here, but I don't have an network connection
   * right now.
   */
  if (cartIndex > -1) {
    state.cart[cartIndex].count += 1
  } else {
    state.cart.push(Object.assign({ count: 1 }, state.items[itemIndex]))
  }

  return state
}

export const remove = (state, id) => {
  const cartIndex = getItem(state.cart, id)
  if (cartIndex < 0) throw new Error('No such item in cart (${id})')

  if (state.cart[cartIndex].count < 2) {
    state.cart.splice(cartIndex, 1)
  } else {
    state.cart[cartIndex].count -= 1
  }

  return state
}

