import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import DisplayItem from '../components/DisplayItem';
import MilkTea from '../assets/milk-tea.jpg';
import TeaLatte from '../assets/tea-latte.jpg';
import Slush from '../assets/slush.jpg';
import CreativeMix from '../assets/creative-mix.png';
import BrewedTea from '../assets/brewed-tea.jpg';
import { lowercaseUnderscore } from '../util/format';

const Categories = () => {
  const [categories, setCategories] = useState([
    {itemImg: MilkTea, itemName: "Milk Tea"},
    {itemImg: TeaLatte, itemName: "Tea Latte"},
    {itemImg: Slush, itemName: "Slush"},
    {itemImg: CreativeMix, itemName: "Creative Mix"},
    {itemImg: BrewedTea, itemName: "Brewed Tea"}
  ])

  return (
    <div className='categories'>
        {
            categories.map(({itemImg, itemName}, index) => (
                <Link to={'./' + lowercaseUnderscore(itemName)} key={index}><DisplayItem  itemImg={itemImg} itemName={itemName} /></Link>
            ))
        }
    </div>
  )
}

export default Categories