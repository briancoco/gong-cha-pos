import React from 'react'

const DisplayItem = ({itemImg, itemName}) => {
  return (
    <div className='display-item'>
        <img className='display-item-img' src={itemImg} alt={itemName} />
        <div>{itemName}</div>
    </div>
  )
}

export default DisplayItem