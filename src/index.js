// Set up your application entry point here...

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render (){
    return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-4 offset-md-4">
        herro world
        </div>
      </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));