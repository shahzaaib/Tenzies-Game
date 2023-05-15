//import logo from './logo.svg';
import React from "react";
import './App.css';
import Die from "./components/Die"
import { nanoid } from 'nanoid'
//import Confetti from 'react-confetti'

export default function App() {


//const[numbers, setNumbers] = React.useState(allNewDice())
const [dice, setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] = React.useState(false)


React.useEffect(()=>{
 const allHeld = dice.every(die => die.isHeld)
 const firstValue = dice[0].value
 const allSameValue = dice.every(die => die.value === firstValue) 
  if(allHeld && allSameValue){
    setTenzies(true)
    console.log("You Won")
  }
},[dice])

function generateNewDice(){
  return {
  value: Math.floor(Math.random() * 6) + 1,
  isHeld: false,
  id: nanoid()
}}
 
  function allNewDice() {
    const randomNumbers = []
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(generateNewDice())
  }
  console.log(randomNumbers)
    return randomNumbers
    
  }

 //console.log(allNewDice())

 function holdDice(id){
setDice(oldDice => oldDice.map(dice1 => {
 return dice1.id === id ? {...dice1, isHeld: !dice1.isHeld} : dice1
}))
 }


 function rollDice(id){
  if(!tenzies){
  setDice(oldRollDice => oldRollDice.map(die => {
return die.isHeld ?
die :
generateNewDice()
  }))} else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

  const renderNumber = dice.map(dice => 
    <Die value={dice.value} key={dice.id} isHeld ={dice.isHeld} holdDice={() => holdDice(dice.id)} />
  )
 return(
  <main> 
    <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className="dice-container">
  {renderNumber}
  </div>
  <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
  </main>
 )
 }

