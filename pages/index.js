import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Category from '../components/Category'
import Product from '../components/Product'
import Container from '../components/UI/Container'
import Context from '../context/store'

function Home() {
  const { state, dispatch } = useContext(Context)

  const addCategory = () => {
    let categoryData = state.categories
    categoryData.push({
      id: uuidv4(),
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
      <div className="grid grid-cols-2 gap-4 space-x-3 py-3">
        <div className="flex flex-col w-full space-y-3 h-96">
          <div className="w-full p-3 border border-gray-300 rounded">
            <span>Available Products</span>
            {state.freeProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          <div className="w-full p-3 border border-blue-700 rounded">
            <span className="text-blue-700">Review</span>
            <div className="my-4">
              <p className="my-4">Available Products: {state.freeProducts.length}</p>
              <p>Categories: {state.categories.length}</p>
              {state.categories.map((category, index) => (
                <p className="my-4" key={index}>
                  {category.name} : {category.products.length}
                </p>
              ))}
            </div>
          </div>
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
            <button onClick={addCategory} className="bg-blue-700 text-white w-full p-2 rounded">
              Add Category
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
