import { useState } from 'react'
import Die from './Die'

const App = () => {

  const allNewDice = () => {
    //create new array to hold my numbers
    const newDice = []
    //loop through 10 times
    for(let i = 0; i < 10; i++){
      //push a random number from 1-6 to my array
      newDice.push(Math.ceil(Math.random() * 6))
    }
    //return 
    return newDice
  }
  const [ dice, setDice ] = useState(allNewDice())

  const rollDice = () => {
    setDice(allNewDice())
  }
  
  const diceElements = dice.map((die) => <Die value={die}/>)

  return (
    <main>
      <div className='dice__container'>
        {diceElements}
      </div>
      <button className='roll__dice' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
