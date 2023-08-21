import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App(){
  
  const [dice, setDice] = useState(allNewDice())

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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateDie()
    }))
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

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  )
}