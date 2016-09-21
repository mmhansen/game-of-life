// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// styles
require('./styles/styles.scss');
// Component
import Header from './components/Header';
import Game from './components/Game';



class App extends React.Component {
  // initial state
  constructor(){
    super();
    // make the initial board
    const createBoard  = () => {
      let gameBoard = [];
      // rows
      [...Array(30)].map((item, index) => {
        gameBoard.push([]);
        // push random 1 || 0 into columns
        [...Array(30)].map(() => {
          gameBoard[index].push(Math.floor(Math.random()*2));
        });
      });
      return gameBoard;
    };
    // set the initial empty board and board size
    this.state = {
      board: createBoard(),
      ticks: 0,
      speed: 100,
      tick: 0,
      playing: false,
      empty: true
    };
  }
createBoard () {
    let gameBoard = [];
    // rows
    [...Array(30)].map((item, index) => {
      gameBoard.push([]);
      // push random 1 || 0 into columns
      [...Array(30)].map(() => {
        gameBoard[index].push(Math.floor(Math.random()*2));
      });
    });
    return gameBoard;
  }
// check cell
checkCell(col, row){
  let grid = this.state.board;
  let alive = (grid[col][row] === 1);
  let counter = 0;
  for(let i=col-1; i<=col+1; i++){
    for(let j=row-1; j<=row+1; j++){
      if(i > -1 && i < 30 && j > -1 && j < 30 && !(i===col && j===row)){
        if(grid[i][j] === 1){
          counter++;
        }
      }
    }
  }
  if(alive){
    return (counter === 2 || counter === 3) ? 1 : 0;
  }else{
    return (counter === 3) ? 1 : 0;
  }
}
// check board
checkBoard(){
  let newBoard = [];
  // loop through index 0-29
    for(let i = 0; i < 30; i++) {
      let col = [];
      for(let j = 0; j < 30; j++) {
        // this returns the new state of the cell passed to it
        col.push(this.checkCell(i, j));
      }
// when done looping row, push in the new board
      newBoard.push(col);
    }
// when done looping board, push it into state
this.setState({
  board: newBoard
});
this.state['tick'] += 1;
  //this.increment();
}
createEmptyBoard () {
 let gameBoard = [];
 // rows
 [...Array(30)].map((item, index) => {
   gameBoard.push([]);
   // push random 1 || 0 into columns
   [...Array(30)].map(() => {
     gameBoard[index].push(0);
   });
 });
 return gameBoard;
}
// handle cell clicked
handleCellClicked(coords){
  let coordSplit = coords.split(',');
  let newBoard = this.state.board;
  newBoard[coordSplit[0]][coordSplit[1]] = 1;

  this.setState({board: newBoard, empty: false});
}
// start click
handleStart(event){
  event.preventDefault();
  // if the game is already running
  if (this.state.playing) {
    this.setState({playing: false})
    clearInterval(this.clock);
  } else {
    this.setState({playing: true})
    this.clock = setInterval(this.checkBoard.bind(this), this.state.speed);
  }
  // populate board if cleared
  if (this.state.empty) {
    this.setState({board: this.createBoard(), empty: false, tick : 0})
  }
}
// end interval
handleClear(event){
  event.preventDefault();
  clearInterval(this.clock);
  this.setState({tick: 0});
  this.setState({board: this.createEmptyBoard(), empty: true})

}

// fast ticks
handleFast(event){
  event.preventDefault();
  this.setState({
    speed: 50
  });
}
// slow ticks
handleSlow(event){
  event.preventDefault();
  this.setState({
    speed: 300
  });
}
  render (){
    return (
      <div className="container" id="game-board">
        <div className="row">
          <div className="game-card">
          <Header
            handleStart={this.handleStart.bind(this)}
            handleClear={this.handleClear.bind(this)}
            handleFast={this.handleFast.bind(this)}
            handleSlow={this.handleSlow.bind(this)}
            tick={this.state.tick}
            />
          <br />
          <Game
            board={this.state.board}
            handleClick={this.handleCellClicked.bind(this)}
            />
        </div>
      </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
