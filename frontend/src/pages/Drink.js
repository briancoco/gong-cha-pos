import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Drink = () => {
  const {id: drinkId} = useParams();
  const [drink, setDrink] = useState({});

  useEffect(() => {
    const fetchDrink = async () => {
      let response = await fetch(`http://localhost:3001/drinks/${drinkId}`);
      if(!response.ok) {
        console.log('Failed to fetch drink');
        return;
      }
      response = await response.json();
      console.log(response);
      setDrink(response[0]);
    }
    fetchDrink();
  }, [drinkId])
  
  return (
    <div className='drink'>
      <img className='drink-img' src={drink.image} alt={drink.drink_name} />
      <section className='drink-info'>
        <div>{drink.drink_name}</div>
        <p>{drink.description}</p>
        <button className='cart-btn'>Add to Cart</button>
      </section>
    </div>
  )
}

export default Drink