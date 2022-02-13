import React, { useContext } from 'react'

import Context from '../context/store'

function Category({ categoryName, categoryID, categoryProducts }) {
  const { state, dispatch } = useContext(Context)

  const removeCategory = () => {
    let categories = state.categories
    categories = state.categories.filter((category) => category.id != categoryID)
    dispatch({
      type: 'CATEGORIES',
      payload: categories,
    })
  }

  const addProduct = () => {
    const { freeProducts, selectedProducts } = state
    let categories = state.categories
    let currentCategory = state.categories.findIndex((category) => category.id == categoryID)
    categories[currentCategory] = {
      ...categories[currentCategory],
      products: state.selectedProducts,
    }
    var newFreeProducts = freeProducts.filter(
      (free) => !selectedProducts.find((selected) => free.id == selected.id)
    )
    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: newFreeProducts,
    })
    dispatch({
      type: 'CATEGORIES',
      payload: categories,
    })
  }

  const removeProduct = () => {
    const { categories } = state
    let currentCategory = state.categories.findIndex((category) => category.id == categoryID)
    console.log(categories[currentCategory])
  }

  return (
    <div className="p-3 border border-gray-300 rounded min-h-full">
      <div className="flex-col justify-between">
        <div>
          <span>{categoryName}</span>
        </div>
        <div>
          {categoryProducts.map((product, index) => (
            <div key={index} className="my-4">
              <div key={product.id} className="my-2 flex items-center">
                <input type="checkbox" />
                <label className="text-sm mx-4">{product.name}</label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => addProduct()}
              className={`${
                state.selectedProducts.length > 0
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-400 text-gray-100'
              } py-1 px-2 rounded-sm`}
            >
              Add Products
            </button>
            <button
              onClick={removeProduct}
              className="bg-gray-400 py-1 px-2 rounded-sm text-gray-100"
            >
              Remove Products
            </button>
          </div>
          <div>
            <button
              disabled={state.categories.length == 1}
              onClick={removeCategory}
              className={`${
                state.categories.length > 1 ? 'bg-blue-700 text-white' : 'bg-gray-400 text-gray-100'
              } py-1 px-2 rounded-sm`}
            >
              Remove Category
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
