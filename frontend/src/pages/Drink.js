import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Customizer from '../components/Customizer';
import { lowercaseUnderscore } from '../util/format';
const Drink = () => {
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
        res[lowercaseUnderscore(ingredient.item_name)] = 0;
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
        
        item.quantity = drinkInfo[item.itemName];
      }
      setIngredients(ingredientsInfo);
    }

    setup();
  }, [drinkId])

  return (
    <div className='drink'>
      <img className='drink-img' src={drink.image} alt={drink.drink_name} />
      <section className='drink-info'>
        <div>{drink.drink_name}</div>
        <p>{drink.description}</p>
        <Customizer ingredients={ingredients} setIngredients={setIngredients} />
        <button className='cart-btn'>Add to Cart</button>
      </section>
    </div>
  )
}

export default Drink