import { useState } from "react";
import "./App.css";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNumber = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(2),
      };
      newDice.push(randomNumber);
    }
    return newDice;
  }

  function handleClick() {
    gameWon ? setDice(generateAllNewDice()) :
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      onClick={() => hold(dieObj.id)}
    />
  ));
  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElements}</div>

      <button className="roll-dice" onClick={handleClick}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
