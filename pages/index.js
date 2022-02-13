import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BsBox } from 'react-icons/bs'
import { FiSave } from 'react-icons/fi'

import { Container, Category, Product } from '../components'

import Context from '../context/store'

function Home() {
  const { state, dispatch } = useContext(Context)

  const addCategory = () => {
    let newCategory = state.categories
    newCategory.push({
      id: uuidv4(),
      name: `Category ${state.categories.length + 1}`,
      products: [],
    })
    dispatch({
      type: 'CATEGORIES',
      payload: newCategory,
    })
  }

  return (
    <Container>
      <div className="grid grid-cols-2 gap-4 space-x-3 py-3">
        <div className="flex flex-col w-full space-y-3 h-96">
          <div className="w-full p-3 border border-gray-300 rounded">
            <span className="flex items-center">
              <BsBox size={30} className="mr-3" /> Available Products
            </span>
            <div className="mt-8">
              {state.availableProducts.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </div>
          <div className="w-full p-3 border border-blue-700 rounded">
            <span className="flex items-center text-blue-700">
              <FiSave size={30} className="mr-3" />
              Review
            </span>
            <div className="mt-8">
              <p>Available Products: {state.availableProducts.length}</p>
              <p>Categories: {state.categories.length}</p>
              <div className="my-6">
                {state.categories.map((category, index) => (
                  <p key={index}>
                    {category.name}: {category.products.length} products
                  </p>
                ))}
              </div>
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
