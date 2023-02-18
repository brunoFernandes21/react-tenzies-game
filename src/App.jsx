import { useState, useEffect } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false, 
      id: nanoid()
    }
  }

  const allNewDice = () => {
    //create new array to hold my numbers
    const newDice = []
    //loop through 10 times
    for(let i = 0; i <10; i++){
      //push a random number from 1-6 to my array
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const [ dice, setDice ] = useState(allNewDice())
  const [ tenzies, setTenzies ] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const sameValue = dice.every(die => die.value)
    if(allHeld && sameValue){
      setTenzies(true)
       console.log('Congrats. You have won!')
    }
  }, [dice])
  
  const rollDice = () => {
    if(tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    }else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    
  }

  const holdDice = (id) => {
    setDice((oldDice) => oldDice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : 
      die
    }))
  }
    
  const diceElements = dice.map((die) => (
  <Die 
  key={die.id}
  value={die.value}
  isHeld={die.isHeld}
  holdDice={()=> holdDice(die.id)}
  />
  ))

  const styles = {
    width: tenzies ? '150px' : '100px'
  }
  return (
    <main>
      { tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. 
        Click each die to freeze it at its current value
        between rolls.
        </p>
      <div className='dice__container'>
        {diceElements}
      </div>
      <button style={styles} className='roll__dice' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
