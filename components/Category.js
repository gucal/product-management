import React, { useState, useContext } from 'react'

import Context from '../context/store'

function Category({ categoryName, categoryID, categoryProducts }) {
  const { state, dispatch } = useContext(Context)

  const [selectProductWithCategory, setSelectProductWithCategory] = useState([])

  const removeCategory = () => {
    let categories = state.categories
    let allProducts = state.freeProducts
    categories = state.categories.filter((category) => category.id != categoryID)

    categoryProducts.map((prod) => {
      allProducts.push(prod)
    })

    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: allProducts,
    })

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
      products: [...categories[currentCategory].products, ...state.selectedProducts],
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
    dispatch({
      type: 'SELECTED_PRODUCT',
      payload: [],
    })
  }

  const removeProduct = () => {
    let categories = state.categories
    let allProducts = state.freeProducts
    let currentCategory = state.categories.findIndex((category) => category.id == categoryID)
    const categoryProducts = categories[currentCategory].products

    categoryProducts = categoryProducts.filter(
      (free) => !selectProductWithCategory.find((selected) => free.id == selected.id)
    )

    categories[currentCategory] = { ...categories[currentCategory], products: categoryProducts }

    dispatch({
      type: 'CATEGORIES',
      payload: categories,
    })
    selectProductWithCategory.map((prod) => {
      allProducts.push(prod)
    })
    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: allProducts,
    })

    setSelectProductWithCategory([])
  }

  const onChange = (isTrue, product) => {
    const productCategory = selectProductWithCategory

    if (isTrue) {
      productCategory.push({ ...product })
    } else {
      productCategory = productCategory.filter((prod) => prod.id !== product.id)
    }
    setSelectProductWithCategory([...productCategory])
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
                <input
                  onChange={(e) => onChange(e.target.checked, product)}
                  id={'category-prod' + product.id}
                  type="checkbox"
                />
                <label htmlFor={'category-prod' + product.id} className="text-sm mx-4">
                  {product.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button
              disabled={state.selectedProducts.length < 1}
              onClick={addProduct}
              className={`${
                state.selectedProducts.length > 0
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-400 text-gray-100'
              } py-1 px-2 rounded-sm`}
            >
              Add Products
            </button>
            <button
              disabled={selectProductWithCategory.length < 1}
              onClick={removeProduct}
              className={`${
                selectProductWithCategory.length > 0
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-400 text-gray-100'
              } py-1 px-2 rounded-sm`}
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
