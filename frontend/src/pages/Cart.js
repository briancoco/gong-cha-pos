import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let currCart = localStorage.getItem('cart');
    if(!currCart) return;
    setCart(JSON.parse(currCart));
  }, []);

  const removeCart = (id) => {
    let res = [...cart];
    res = res.filter((cartItem) => cartItem.drink_id !== id);
    localStorage.setItem('cart', JSON.stringify(res));
    setCart(res);
  };

  const handleCheckout = async () => {
    const response = await fetch('http://localhost:3001/orders?user=1', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    });
    if(!response.ok) {
      console.log("Failed to checkout");
      return;
    }
    console.log("Checkout success!");
    setCart([]);
    localStorage.removeItem('cart');
  }

  return (
    <div className='cart-container'>
      {
        cart.length ? 
        <div className='cart'>
          {
            cart.map((cartItem, index) => (
              <CartItem key={index} itemName={cartItem.name} itemImage={cartItem.image} onRemove={() => removeCart(cartItem.drink_id)} />
            ))
          }
        </div>
        :
        <section className='cart-empty'>
          <h1>Your cart is empty</h1>
          <Link to='/order'><button className='order-btn'>Add Items</button></Link>
        </section>
      }
      {cart.length > 0 && <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>}
    </div>
  )
}

export default Cart