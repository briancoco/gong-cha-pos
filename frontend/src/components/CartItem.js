import React from 'react'

const CartItem = ({itemName, itemImage, onRemove}) => {
  return (
    <div className='cart-item'>
      <img className='cart-item-img' src={itemImage} alt="" />
      <h5>{itemName}</h5>
      <section className='cart-item-info'>
        <div>$5.99</div>
        <button className='remove-btn' onClick={onRemove}>Remove</button>
      </section>
    </div>
  )
}

export default CartItem