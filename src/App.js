import { useEffect, useState } from 'react';
import './App.css';
import BoxContainer from './components/BoxContainer';


function App() {
  const [playerBoxes, setPlayerBoxes] = useState([]);
  const [enemyBoxes, setEnemyBoxes] = useState([])
  const [playerPoints, setPlayerP] = useState(0);
  const [enemyPoints, setEnemyP] = useState(0);
  const [message, setMessage] = useState(null);

  function fillBoxes(cols, setBoxes, setPoints) {
    var newArray = [];
    var points = 0;
    for (let i = 0; i < cols; i++) {
      newArray[i] = [];
      for (let j = 0; j < cols; j++) {
        newArray[i].push(0)
      }
    }

    for (let i = 0; i < 5; i++) {
      let x = Math.floor(Math.random() * cols);
      let y = Math.floor(Math.random() * cols);
      let direction = Math.random() < 0.5 ? -1 : 1;
      let axis = Math.floor(Math.random() * 2);

      for (let j = 0; j < Math.floor(Math.random() * 3) + 2; j++) {
        newArray[x].splice(y, 1, 1)
        if (axis === 0) {
          if (x === 9) {
            direction = -1;
          } else if (x === 0) {
            direction = 1;
          }
          x += direction;
        } else {
          if (y === 9) {
            direction = -1;
          } else if (y === 0) {
            direction = 1;
          }
          y += direction;
        }
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        if (newArray[i][j]) {
          points++;
        }
      }
    }
    setPoints(points);
    setBoxes(newArray);
  }

  function changeValue(boxes, setBoxes, value, i, j) {
    let newArray = [...boxes];
    newArray[i].splice(j, 1, value);
    setBoxes(newArray);
  }

  function enemy(cols) {
    let newArray = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        if (playerBoxes[i][j] === 0) {
          newArray.push([i, j])
        }
      }
    }
    let enemyPLay = newArray[Math.floor(Math.random() * newArray.length)];
    let i = enemyPLay[0];
    let j = enemyPLay[1];
    if (enemyBoxes[i][j] === 1) {
      changeValue(playerBoxes, setPlayerBoxes, 2, i, j);
      setPlayerP(playerPoints - 1);
      checkWinner()
      enemy(cols);
    } else {
      changeValue(playerBoxes, setPlayerBoxes, 3, i, j);
      checkWinner();
    }

  }

  function checkWinner(){
    if(playerPoints === 0){
      setMessage("The Enemy has won");
    }else if(enemyPoints === 0){
      setMessage("The Player has won");
    }
  }

  function handleClick(type, i, j) {
    if (type === "enemy") {
      if (enemyBoxes[i][j] === 1) {
        changeValue(enemyBoxes, setEnemyBoxes, 2, i, j);
        setEnemyP(enemyPoints - 1);
        checkWinner();
      } else if (enemyBoxes[i][j] === 0) {
        changeValue(enemyBoxes, setEnemyBoxes, 3, i, j);
        checkWinner();
        enemy(10);
      }

    }
  }


  useEffect(() => {
    fillBoxes(10, setPlayerBoxes, setPlayerP);
    fillBoxes(10, setEnemyBoxes, setEnemyP);
  }, []);

  useEffect(() => {

  }, [playerBoxes])

  return (
    <div className="container">
      <div className="board">
        <BoxContainer boxes={playerBoxes} type="player" handleClick={handleClick} />
        <BoxContainer boxes={enemyBoxes} type="enemy" handleClick={handleClick} />
      </div>
      <div>
          {!!message &&
            (
              <div className="winner">
                <h1>{message}</h1>
              </div>

            )
          }
        </div>
    </div>
  );
}


export default App;
