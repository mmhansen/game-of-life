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
      cols: 10,
      rows: 10,
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
  this.setState({
    generation: setInterval(()=>{
      // look through each row
      this.state.board.map((row, index)=>{
        // look at each cell
        row.map((cell, dex)=>{
          // get the position up
          const getN = (index) => {
            if (index == 0) {
              return 9;
            } else {
              return (index-1);
            }
          };
          // get the position right
          const getE = (dex) => {
            if (dex == 9) {
              return 0;
            } else {
              return (dex+1);
            }
          };
          // get the position down
          const getS = (index) => {
            if (index == 9) {
              return 0;
            } else {
              return (index+1);
            }
          };
          // get the position left
          const getW = (dex) => {
            if (dex == 0) {
              return 9;
            } else {
              return (dex-1);
            }
          };

          const board = this.state.board;
          // eight neighbors
          let N = board[getN(index)][dex];
          let E = board[index][getE(dex)];
          let S = board[getS(index)][dex];
          let W = board[index][getW(dex)];
          let NE = board[getN(index)][getE(dex)];
          let SE = board[getS(index)][getE(dex)];
          let SW = board[getS(index)][getW(dex)];
          let NW = board[getN(index)][getW(dex)];
          // current position
          let cPos = board[index][dex];
          // get the neighbor status
          const neighbors = [N, NE, E, SE, S, SW, W, NW];
          let neighborsAlive = 0;
          let neighborsDead = 0;
          neighbors.map((neighbor)=>{
            if (neighbor) {
              return neighborsAlive++;
            } else {
              return neighborsDead++;
            }
          });
          // check if cell has < 2 living neighbors => it dies
          if (cPos === 1 && neighborsAlive < 2) {
            // dies
            cPos = 0;
          }
          // check if cell has 2-3 neighbors => it lives
          if (cPos === 1 && neighborsAlive <= 3) {
            // nothing changes
            cPos = 1;
          }
          // check if cell has > 3 and is alive neighbors => it dies
          if (cPos === 1 && neighborsAlive > 3) {
            // dies
            cPos = 0;
          }
          // check if cell has = 3 neighbors and is dead => it lives
          if (cPos === 0 && neighborsAlive == 3) {
            // brought to life
            cPos = 1;
          }
        });
      });
    }, this.state.speed)

  });
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
