import React, {useState, useEffect} from 'react'
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let currCart = localStorage.getItem('cart');
    if(!currCart) return;
    setCart(JSON.parse(currCart));
  }, []);

  return (
    <div className='cart-container'>
      <div className='cart'>
        {
          cart.map((cartItem, index) => (
            <CartItem key={index} itemName={cartItem.name} itemImage={cartItem.image} />
          ))
        }
      </div>
      <button className='checkout-btn'>Checkout</button>
    </div>
  )
}

export default Cart