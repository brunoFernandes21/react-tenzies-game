import React from 'react'

const Die = (props) => {
  const { value, isHeld, holdDice } = props

  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'wheat'
  }
  return (
    <div 
		className='die-face'
    style={styles}
    onClick={holdDice}
		>
      <h2 className='die__numb'>{value}</h2> 
    </div>
  )
} 

export default Die