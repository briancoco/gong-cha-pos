import React from 'react';
import { Link } from 'react-router-dom';
import GongChaLogo from '../assets/Gongcha-Logo.png';
import MagnifyingGlass from './MagnifyingGlass';

const Header = () => {
  const magnifyButtonRef = React.createRef();

  return (
    <div className='header'>
        <section className='header-section'>
            <Link to='/'><img src={GongChaLogo} alt="Gong Cha Logo" width="200px"/></Link>
            <button id="magnify" ref={magnifyButtonRef}>Magnifier</button>
            <div id="google_translate_element"></div>
        </section>
        <section className='header-section'>
            <Link to='/menu'><div>Menu</div></Link>
            <Link to='/login'><div>Login</div></Link>
            <Link to='cart'><div>Cart</div></Link>
        </section>
        <MagnifyingGlass magnifyButton={magnifyButtonRef.current} />
    </div>
  )
}

export default Header;
