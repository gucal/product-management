export function reducer(state, action) {
  switch (action.type) {
    case 'CATEGORIES':
      state.categories = action.payload
      return { ...state }

    case 'SELECTED_PRODUCT':
      state.selectedProducts = action.payload
      return { ...state }

    case 'SET_ALL_PRODUCTS':
      state.freeProducts = action.payload
      return { ...state }

    default:
      return state
  }
}
