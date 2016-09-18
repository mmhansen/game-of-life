import React from 'react';

// h1 should baffle until you hover over any of the buttons
const Header = ({ handleStart, handleClear, handleSlow, handleFast }) => (
  <div className="head">
    <h1>Game of Life</h1>
    <div className="buttons">
      <button
        onClick={handleSlow}
        className="btn btn-secondary">Slow</button>
      <button
        onClick={handleFast}
        className="btn btn-secondary">Fast</button>
      <button
        onClick={handleStart}
        className="btn btn-secondary">Start</button>
      <button
        onClick={handleClear}
        className="btn btn-secondary">Clear</button>
    </div>
  </div>
);

/*
Header.propTypes = {
  handleStart: React.propTypes.func
};
*/

export default Header;
