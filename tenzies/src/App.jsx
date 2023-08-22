import { useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const fristNumber = dice[0].value
    const allSameValue = dice.every(die => die.value === fristNumber)

    if (allHeld && allSameValue){
      setTenzies(true)
    }

  },[dice])

  // Generating die numbers
  function generateDie(){
    return {
      id : nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice(){
    const newDice = []

    for(let i = 0; i < 10; i++){
      newDice.push(generateDie())
    }

    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDie()
      }))

      setCount(prevCount => prevCount + 1)

    } else{
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    }
  }

  // Generate dice elements
  const diceElements = dice.map(die => <Die 
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)} />)


  // Hodling dice numbers
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return(
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      {
        tenzies ?
          <div>
            <h2 className="winning-title">Congratulations</h2>
            <p className="rolls-count">you did it in <b>{count} rolls.</b></p>
          </div>
          :
          <>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
              {diceElements}
            </div>
          </>
      }
      <button className="roll-button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}