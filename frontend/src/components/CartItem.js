import React from 'react'

const CartItem = ({itemName, itemPrice, itemImage, onRemove}) => {
  return (
    <div className='cart-item'>
      <img className='cart-item-img' src={itemImage} alt="" />
      <h5>{itemName}</h5>
      <section className='cart-item-info'>
        <div>{itemPrice}</div>
        <button className='remove-btn' onClick={onRemove}>Remove</button>
      </section>
    </div>
  )
}

export default CartItem