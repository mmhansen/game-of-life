// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// styles
require('./styles/styles');

class App extends React.Component {
  render (){
    const board = {
      rows: 40,
      cols: 40
    }
    return (
      <div className="container-fluid">
        { []
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));