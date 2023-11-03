import React from 'react';
import { Link } from 'react-router-dom';
import GongChaLogo from '../assets/Gongcha-Logo.png';
import magnifyingGlass from './MagnifyingGlass';

const Header = () => {
  return (
    <div className='header'>
        <section className='header-section'>
            <Link to='/'><img src={GongChaLogo} alt="Gong Cha Logo" width="200px"/></Link>
            <button id="magnify">Magnifier</button>
            <div id="google_translate_element"></div>
        </section>
        <section className='header-section'>
            <Link to='/menu'><div>Menu</div></Link>
            <Link to='/login'><div>Login</div></Link>
            <Link to='cart'><div>Cart</div></Link>
        </section>
    </div>
  )
}

export default Header