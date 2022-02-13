import React, { useState, useContext } from 'react'

import Category from '../components/Category'
import Product from '../components/Product'
import Container from '../components/UI/Container'
import Context from '../context/store'

function Home() {
  const { state, dispatch } = useContext(Context)

  const addCategory = () => {
    let categoryData = state.categories
    categoryData.push({
      id: state.categories.length + 1,
      name: `Category ${state.categories.length + 1}`,
      products: [],
    })
    dispatch({
      type: 'CATEGORIES',
      payload: categoryData,
    })
  }

  return (
    <Container>
      <div className="flex justify-between space-x-3 py-3">
        <div className="w-full p-3 border border-gray-300 rounded">
          <span>Available Products</span>
          {state.freeProducts.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
        <div className="w-full space-y-3">
          {state.categories.map((category, index) => (
            <Category
              categoryName={category.name}
              categoryID={category.id}
              key={index}
              categoryProducts={category.products}
            />
          ))}
          <div>
            <button
              onClick={() => addCategory()}
              className="bg-blue-700 text-white w-full p-2 rounded"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
