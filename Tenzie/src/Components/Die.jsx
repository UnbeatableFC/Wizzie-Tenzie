import { useState } from "react";

function Die(props) {
  const styles = {
    backgroundColor : props.isHeld ? "#59E391" : "white"
  }

  return (
    <div>
      <button style={styles} onClick={props.onClick} className="die"  aria-label={`Die with value ${props.value} , ${props.isHeld ? "held" : "not held"} `}
       aria-pressed = {props.isHeld}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Die;
