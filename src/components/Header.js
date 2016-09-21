import React from 'react';

$(document).ready(function(){
  $('#slow').click(()=>{
    $('#slow').addClass('active');
    $('#fast').removeClass('active');
  });

  $('#fast').click(()=>{
    $('#fast').addClass('active');
    $('#slow').removeClass('active');
  });
})

// h1 should baffle until you hover over any of the buttons
const Header = ({ handleStart, handleClear, handleSlow, handleFast, tick }) => (
  <div className="head">
    <h1>Game of Life</h1>
    <div className="buttons">
      <button
        onClick={handleSlow}
        className="btn btn-secondary"
        id="slow">Slow</button>
      <button
        onClick={handleFast}
        className="btn btn-secondary"
        id="fast">Fast</button>
      <button
        onClick={handleStart}
        className="btn btn-secondary"
        id="start">Start</button>
      <button
        onClick={handleClear}
        className="btn btn-secondary"
        id="clear">Clear</button>
    </div>
    <div>
      <span>
        Generation : {tick}
      </span>
    </div>
  </div>
);

/*
Header.propTypes = {
  handleStart: React.propTypes.func
};
*/

export default Header;
