import React from 'react'
import Tea1 from '../assets/Tea-1.png';
import Tea2 from '../assets/Tea-2.jpg';
import Tea3 from '../assets/Tea-3.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <h1>Bringing Bubble Tea to the United States!</h1>
      <section className='home-img-container'>
        <img className='home-img' src={Tea1} alt='Tea1' />
        <img className='home-img' src={Tea2} alt='Tea2' />
        <img className='home-img' src={Tea3} alt='Tea3' />
      </section>
      <Link to='/order'><button className='order-btn'>Order Now</button></Link>

    </div>
  )
}

export default Home