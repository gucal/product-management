import React, { useState, useContext } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

import Context from '../context/store'

function Category({ categoryName, categoryID, categoryProducts }) {
  const { state, dispatch } = useContext(Context)

  const [selectProductWithCategory, setSelectProductWithCategory] = useState([])

  const addProduct = () => {
    const { availableProducts, selectedProducts } = state
    let allCategories = state.categories
    let currentCategoryIndex = state.categories.findIndex((category) => category.id == categoryID)

    allCategories[currentCategoryIndex] = {
      ...allCategories[currentCategoryIndex],
      products: [...categoryProducts, ...state.selectedProducts],
    }

    let remainderAvailableProducts = availableProducts.filter(
      (free) => !selectedProducts.find((selected) => free.id == selected.id)
    )

    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: remainderAvailableProducts,
    })
    dispatch({
      type: 'CATEGORIES',
      payload: allCategories,
    })
    dispatch({
      type: 'SELECTED_PRODUCT',
      payload: [],
    })
  }

  const removeProduct = () => {
    let allCategories = state.categories
    let allAvailableProducts = state.availableProducts
    let currentCategoryIndex = state.categories.findIndex((category) => category.id == categoryID)
    const currentCategoryProducts = categoryProducts

    currentCategoryProducts = currentCategoryProducts.filter(
      (availableProd) =>
        !selectProductWithCategory.find((selected) => availableProd.id == selected.id)
    )

    allCategories[currentCategoryIndex] = {
      ...allCategories[currentCategoryIndex],
      products: currentCategoryProducts,
    }

    dispatch({
      type: 'CATEGORIES',
      payload: allCategories,
    })
    selectProductWithCategory.map((prod) => {
      allAvailableProducts.push(prod)
    })
    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: allAvailableProducts,
    })

    setSelectProductWithCategory([])
  }

  const removeCategory = () => {
    let allCategories = state.categories
    let allAvailableProducts = state.availableProducts
    allCategories = state.categories.filter((category) => category.id != categoryID)

    categoryProducts.map((prod) => {
      allAvailableProducts.push(prod)
    })

    dispatch({
      type: 'SET_ALL_PRODUCTS',
      payload: allAvailableProducts,
    })

    dispatch({
      type: 'CATEGORIES',
      payload: allCategories,
    })
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
    <div className="flex flex-col justify-between p-3 border border-gray-300 rounded h-full">
      <div>
        <div>
          <span className="flex items-center">
            <BsBoxSeam size={30} className="mr-3" />
            {categoryName}
          </span>
        </div>
        <div className="mt-8">
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
          {categoryProducts.length < 1 && (
            <div className="flex flex-col items-center text-gray-400">
              <div>
                <MdOutlineFavoriteBorder size={30} />
              </div>
              <div>
                <span>Select products to add here.</span>
              </div>
            </div>
          )}
        </div>
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
            Add {state.selectedProducts.length > 0 && state.selectedProducts.length} Products
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
            Remove {selectProductWithCategory.length > 0 && selectProductWithCategory.length}{' '}
            Products
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
  )
}

export default Category
