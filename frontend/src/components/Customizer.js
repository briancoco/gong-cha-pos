import React from 'react'
import IngredientSlider from './IngredientSlider'
const Customizer = ({ingredients, setIngredients}) => {
  return (
    <>
    <h3>Customizations</h3>
    <div className='customizer'>
      {
        ingredients.map((ingredient, index) => (
          <IngredientSlider 
            key={index}
            ingredientName={ingredient.itemName} 
            ingredientNameFormatted={ingredient.itemNameFormatted}
            quantity={ingredient.quantity}
            ingredients={ingredients} 
            setIngredients={setIngredients}
          />
        ))
      }
    </div>
    </>
  )
}

export default Customizer