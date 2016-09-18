import React from 'react';

class Game extends React.Component {
  render (){
    return (
      <div className="board container">
      <div className="row">
        <div className="col-sm-12">
        {
          this.props.board.map((row, index)=>{
            return (
              <div
                className="game-row"
                key={"r"+index}>
                {
                  row.map((cell, dex)=>{
                    if (cell) {
                      return (
                        <div
                          key={"c"+dex}
                          className="alive cell"/>
                      )
                    }
                    else {
                      return (
                        <div
                          key={"c"+dex}
                          className="dead cell"/>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
        </div>
      </div>
      </div>
    );
  }
}


export default Game;
