import React, { useContext } from 'react'

import Context from '../context/store'

function Product({ product }) {
  const { state, dispatch } = useContext(Context)

  const onChange = (isTrue, product) => {
    let thisProduct = state.selectedProducts
    if (isTrue) {
      thisProduct.push({ id: product.id, name: product.name })
    } else {
      thisProduct = thisProduct.filter((prod) => prod.id !== product.id)
    }
    dispatch({
      type: 'SELECTED_PRODUCT',
      payload: thisProduct,
    })
  }

  return (
    <div className="my-4">
      <div key={product.id} className="my-2 flex items-center">
        <input
          onChange={(e) => onChange(e.target.checked, product)}
          id={`checkbox ${product.id}`}
          type="checkbox"
        />
        <label htmlFor={`checkbox ${product.id}`} className="text-sm mx-4">
          {product.name}
        </label>
      </div>
    </div>
  )
}

export default Product
