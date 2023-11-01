import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import DisplayItem from '../components/DisplayItem';

const Drinks = () => {
  const {category} = useParams();
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    //get the category name
    //fetch all the drinks for the given category from the backend
    //update the drinks state to contain all those drinks
    const fetchDrinks = async () => {
      let response = await fetch(`http://localhost:3001/drinks/category/${category}/?season=-1`);
      if(!response.ok) {
        console.log("Failed to fetch drinks");
        return;
      }
      response = await response.json();
      console.log(response);
      setDrinks(response);
    }
    fetchDrinks();
  }, [category])
  return (
    <div className='drinks'>
      {
        drinks.map(({image, drink_name}, index) => (
          <Link to='./drink' key={index}><DisplayItem itemImg={image} itemName={drink_name} /></Link>
        ))
      }
    </div>
  )
}

export default Drinks