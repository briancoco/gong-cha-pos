import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Customizer from '../components/Customizer';
import { lowercaseUnderscore } from '../util/format';
const Drink = ({navigate}) => {
  const {id: drinkId} = useParams();
  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchDrink = async () => {
      let response = await fetch(`http://localhost:3001/drinks/${drinkId}`);
      if(!response.ok) {
        console.log('Failed to fetch drink');
        return;
      }
      response = await response.json();
      setDrink(response[0]);
      console.log(response[0]);
      return response[0];
    }

    const fetchIngredients = async () => {
      let response = await fetch('http://localhost:3001/inventory');
      if(!response.ok) {
        console.log('Failed to fetch ingredients');
      }
      response = await response.json();

      let res = [];
      for(const ingredient of response) {
        res.push({
          itemNameFormatted: ingredient.item_name,
          itemName: lowercaseUnderscore(ingredient.item_name),
          quantity: 0
        });
      }
      return res;
    }

    const setup = async () => {
      const drinkInfo = await fetchDrink();
      const ingredientsInfo = await fetchIngredients();
      for(const item of ingredientsInfo) {
        
        item.quantity = parseInt(drinkInfo[item.itemName]);
      }
      setIngredients(ingredientsInfo);
      console.log(ingredientsInfo);
    }

    setup();
  }, [drinkId])

  const handleCart = () => {
    //constructs order item object using ingredients and drinkId
    //fetch the current cart if it exists
    //stores order item object in localStorage
    const customizations = {}
    for(const ingredient of ingredients) {
      customizations[ingredient.itemName] = ingredient.quantity;
    }
    const orderItem = {
      name: drink.drink_name,
      drink_id: parseInt(drinkId),
      image: drink.image,
      ...customizations
    };
    let cart = localStorage.getItem('cart');
    if(!cart) {
      cart = [orderItem];
    } else {
      cart = JSON.parse(cart);
      cart.push(orderItem);
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className='drink'>
      <img className='drink-img' src={drink.image} alt={drink.drink_name} />
      <section className='drink-info'>
        <div className='drink-name'>{drink.drink_name}</div>
        <p>{drink.description}</p>
        <Customizer ingredients={ingredients} setIngredients={setIngredients} />
        <button className='cart-btn' onClick={handleCart}>Add to Cart</button>
      </section>
    </div>
  )
}

export default Drink