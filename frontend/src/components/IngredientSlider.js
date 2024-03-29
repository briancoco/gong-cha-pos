import React, {useState, useEffect} from 'react'
const IngredientSlider = ({ingredientName, ingredientNameFormatted, quantity, setIngredients, ingredients}) => {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    let res = [...ingredients];
    res = res.map((ingredient) => {
      if(ingredient.itemName === ingredientName) {
        ingredient.quantity = count;
      }
      return ingredient;
    })
    setIngredients(res);
  }, [count])

  return (
    <div className='ingredient-slider'>
      <h5>{ingredientNameFormatted}</h5>
      <section className='ingredient-modifier'>
        <button className='adder-btn' onClick={(e) => setCount(count > 0 ? count - 1 : 0)}>-</button>
        <div>{count}</div>
        <button className='adder-btn' onClick={(e) => setCount(count + 1)}>+</button>
      </section>
    </div>
  )
}

export default IngredientSlider