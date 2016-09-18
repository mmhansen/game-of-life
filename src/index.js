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
    // set the initial empty board and board size
    this.state = {
      board: [],
      cols: 40,
      rows: 40,
      generation: 0,
      speed: 1000
    };
    // push board size into board
    [...Array(this.state.rows)].map((item, index) => {
      this.state.board.push([]);
      // push random 1 || 0 into board rows
      [...Array(this.state.cols)].map(() => {
        this.state.board[index].push(Math.floor(Math.random()*2));
      });
    });

    
  }
// start click
handleStart(event){
  event.preventDefault();
  this.state.generation = setInterval(()=>{
    // look through each row
    this.state.board.map((row, index)=>{
      // look at each cell
      row.map((cell, dex)=>{
        // check if cell has < 2 neighbors => it dies
        // check if cell has 2-3 neighbors => it lives
        // check if cell has > 3 and is alive neighbors => it dies
        // check if cell has = 3 neighbors and is dead => it lives

        // each cell interacts with its 8 neighbors
      });
    });
  }, this.state.speed);
}
// end interval
handleClear(event){
  event.preventDefault();
  window.clearInterval(this.state.generation);
}
// fast ticks
handleFast(event){
  event.preventDefault();
  this.setState({
    speed: 500
  });
}
// slow ticks
handleSlow(event){
  event.preventDefault();
  this.setState({
    speed: 1000
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
