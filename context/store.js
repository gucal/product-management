import { createContext } from 'react'

export const initialState = {
  freeProducts: [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
  ],
  categories: [{ id: 1, name: 'Category 1', products: [] }],
  selectedProducts: [],
}

const Context = createContext(initialState)

export default Context
