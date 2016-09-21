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
      speed: 500,
      tick: 0
    };
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
  console.log("check boards")
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
  //this.increment();

}
// increment

// start click
handleStart(event){
  event.preventDefault();
  this.clock = setInterval(this.checkBoard.bind(this), this.state.speed);
}
// end interval
handleClear(event){
  event.preventDefault();
  clearInterval(this.clock);
  console.log('stopping');
}
// fast ticks
handleFast(event){
  event.preventDefault();
  this.setState({
    speed: 100
  });
}
// slow ticks
handleSlow(event){
  event.preventDefault();
  this.setState({
    speed: 500
  });
}
  render (){
    return (
      <div className="container" id="game-board">
        <div className="row">
          <div className="col-sm-12 col-md-8 offset-md-2 game-card">
          <Header
            handleStart={this.handleStart.bind(this)}
            handleClear={this.handleClear.bind(this)}
            handleFast={this.handleFast.bind(this)}
            handleSlow={this.handleSlow.bind(this)}
            tick={this.state.tick}
            />
          <Game
            board={this.state.board}/>
        </div>
      </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
