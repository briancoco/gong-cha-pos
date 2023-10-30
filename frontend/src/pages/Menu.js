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
            <div>Black Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Brown Sugar Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Caramel Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Earl Grey Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Earl Grey Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Mango Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Oolong Milk Tea</div>
            <div>$5.99</div>
          </div>
          <div className='menu-item'>
            <div>Strawberry Milk Tea</div>
            <div>$5.99</div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Menu