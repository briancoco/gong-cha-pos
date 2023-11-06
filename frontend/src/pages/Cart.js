import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const setupCart = async () => {
      let currCart = localStorage.getItem('cart');
      if(!currCart) return;
      currCart = JSON.parse(currCart);
      const formatter = Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      })

      for(const item of currCart) {
        let response = await fetch('http://localhost:3001/item/price', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(item)
        });

        if(!response.ok) {
          console.log('Could not fetch drink price');
          return;
        }

        response = await response.json();
        item.price = formatter.format(response.price);
      }
      console.log(currCart);
      setCart(currCart);
    }

    const setupUser = () => {
      let userInfo = localStorage.getItem('user_info');
      if(!userInfo) return;
      userInfo = JSON.parse(userInfo);
      setUserId(userInfo.id);
    }

    setupUser();
    setupCart();
  }, []);

  const removeCart = (id) => {
    let res = [...cart];
    res = res.filter((cartItem) => cartItem.drink_id !== id);
    localStorage.setItem('cart', JSON.stringify(res));
    setCart(res);
  };

  const handleCheckout = async () => {
    const response = await fetch(`http://localhost:3001/orders?user=${userId}`, {
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
        cart.length && userId ? 
        <div className='cart'>
          {
            cart.map((cartItem, index) => (
              <CartItem key={index} itemName={cartItem.name} itemPrice={cartItem.price} itemImage={cartItem.image} onRemove={() => removeCart(cartItem.drink_id)} />
            ))
          }
        </div>
        :
        <section className='cart-empty'>
          <h1>{userId === 0 ? 'Please Login First' : 'Your cart is empty'}</h1>
          <Link to={userId === 0 ? '/login' : '/order'}><button className='order-btn'>{userId === 0 ? 'Login' : 'Add Item'}</button></Link>
        </section>
      }
      {cart.length > 0 && <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>}
    </div>
  )
}

export default Cart