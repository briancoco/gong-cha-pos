import React from 'react';
import { Link } from 'react-router-dom';
import GongChaLogo from '../assets/Gongcha-Logo.png';
const Header = () => {
  return (
    <div className='header'>
        <section className='header-section'>
            <Link to='/'><img src={GongChaLogo} alt="Gong Cha Logo" width="200px"/></Link>
            <a href='/'>Zoom</a>
            <a href='/'>Translate</a>
        </section>
        <section className='header-section'>
            <a href='/'>Menu</a>
            <a href='/'>Login</a>
            <a href='/'>Cart</a>
        </section>
    </div>
  )
}

export default Header