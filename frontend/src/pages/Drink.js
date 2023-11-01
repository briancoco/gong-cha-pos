import MilkTea from '../assets/milk-tea.jpg';

const Drink = () => {

  return (
    <div className='drink'>
      <img className='drink-img' src={MilkTea} alt='Milk Tea' />
      <section className='drink-info'>
        <div>Black Milk Tea</div>
        <p>Drink Description</p>
        <button className='cart-btn'>Add to Cart</button>
      </section>
    </div>
  )
}

export default Drink