import React from 'react'
import MilkTea from '../assets/milk-tea.jpg';
import TeaLatte from '../assets/tea-latte.jpg';
import Slush from '../assets/slush.jpg';
import CreativeMix from '../assets/creative-mix.png';
import brewedTea from '../assets/brewed-tea.jpg';

const Menu = () => {
  return (
    <div className='menu'>
      <section className='menu-category-container'>
        <img className='menu-category-img' src={MilkTea} alt='Milk Tea' />
        <section className='menu-category-drinks'>
          <h2 className='category-header'>Milk Tea</h2>
          <div className='menu-item'>
            <p>Black Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Brown Sugar Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Caramel Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Earl Grey Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Earl Grey Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Mango Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Oolong Milk Tea</p>
            <p>$5.99</p>
          </div>
          <div className='menu-item'>
            <p>Strawberry Milk Tea</p>
            <p>$5.99</p>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Menu