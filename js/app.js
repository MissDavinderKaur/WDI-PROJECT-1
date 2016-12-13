//Game variable
var game;

//Constructor for the object
function Domineering (base) {
  this.base = base;
  this.playerA;
  this.playerB;
  this.currPlayer = 'Player A';
}

//********** From this point, the code reads from the bottom upwards ******

//Reset the game
Domineering.resetGame = function(e) {
  e.preventDefault();
  $('#gameBoard').empty();
  $('#reset').remove();
  $('.welcome').show();
  $('#userInputForm').show();
};


//Change the player
Domineering.changePlayer = function() {
  if (game.currPlayer === 'Player A'){
    game.currPlayer = 'Player B';
    $('#currentPlayer').html('Current Player: ' + game.playerB);
  } else {
    game.currPlayer = 'Player A';
    $('#currentPlayer').html('Current Player: ' + game.playerA);
  }
};


//Check for any 2 boxes (one above another)that are empty. If there are any, then the user has options and so play can continue.
Domineering.canPlayerAmove = function() {
  var options = 0;
  for (var i = 0; i < ((this.base * this.base) - this.base); i++) {
    var possibleSecondBoxA = i + this.base;
    if (Domineering.checkBoxes(i, possibleSecondBoxA)) {
      options++;
    }
  }

  if (options > 0) {
    $('#availableMovesA').html('Available Moves: ' + options);
    $('#availableMovesB').html('Available Moves: calculating...');
    return true;
  } else {
    $('#availableMovesA').html('Available Moves: ' + options);
    return false;
  }
};

//Check for any side-by-side boxes that are empty (not on the edge of the grid!). IF there are any, then the user has options and so play can continue.
Domineering.canPlayerBmove = function() {
  var unallowedIndexes = [];
  for (var j = 1; j <= this.base; j++) {
    unallowedIndexes.push((j * this.base) -1);
  }

  var options = 0;
  for (var i = 0; i < ((this.base * this.base) - 1); i++) {
    if (unallowedIndexes.indexOf(i) !== -1) {
      //user will not be allowed to make this move
    } else {
      var possibleSecondBoxB = i + 1;
      if (Domineering.checkBoxes(i, possibleSecondBoxB)) {
        options++;
      }
    }
  }

  if (options > 0) {
    $('#availableMovesB').html('Available Moves: ' + options);
    $('#availableMovesA').html('Available Moves: calculating...');
    return true;
  } else {
    $('#availableMovesB').html('Available Moves: ' + options);
    return false;
  }
};

//Change the colour of the boxes played by the user
Domineering.changeBoxColor = function(player, square1, square2) {
  if (player === 'Player A'){
    $('#' + square1).attr('class', 'Aplayed');
    $('#' + square2).attr('class', 'Aplayed');
  } else {
    $('#' + square1).attr('class', 'Bplayed');
    $('#' + square2).attr('class', 'Bplayed');
  }
};

//Using the checkBoxes method, work out if the two boxes are empty. if so then the move selected by Player B is valid and can be made. Then if Player A can make a move, change the player otherwise alert winner.
Domineering.makeBmove = function (e) {
  var unallowedIndexes = [];
  for (var i = 1; i <= this.base; i++) {
    unallowedIndexes.push((i * this.base) -1);
  }

  if (unallowedIndexes.indexOf(parseInt(e.target.id)) !== -1) {
    //user is not allowed to make this move
  } else {
    var secondBoxB = parseInt(e.target.id) + 1;

    if (Domineering.checkBoxes(e.target.id, secondBoxB)) {
      Domineering.changeBoxColor('Player B', e.target.id, secondBoxB );
      if (Domineering.canPlayerAmove.call(game)){
        Domineering.changePlayer.call(game);
      } else {
        $('#currentPlayer').html(this.playerA + ' cannot make a move. <br> <br> Therefore the winner is ' + this.playerB);
      }
    }
  }
};

//Using the checkBoxes method, work out if the two boxes are empty. if so then the move selected by Player A is valid and can be made. Then, if Player B is able to make a move then change the player otherwise alert winner.
Domineering.makeAmove = function (e) {
  if (e.target.id < ((this.base * this.base) - this.base)) {
    var firstBoxA = (e.target.id).toString();
    var secondBoxA = (parseInt(e.target.id) + this.base).toString();
    if (Domineering.checkBoxes(firstBoxA, secondBoxA)) {
      Domineering.changeBoxColor('Player A', e.target.id, secondBoxA);
      if (Domineering.canPlayerBmove.call(game)){
        Domineering.changePlayer.call(game);
      } else {
        $('#currentPlayer').html(this.playerB + ' cannot make a move. <br> <br> Therefore the winner is ' + this.playerA);
      }
    }
  }
};

//internal method to check the classes of the 2 boxes selected by each user - required before any move is made.
Domineering.checkBoxes = function (boxOne, boxTwo){
  var classOfBoxOne = $('#' + boxOne).attr('class');
  var classOfSecondBox = $('#' + boxTwo).attr('class');

  if(classOfBoxOne === undefined && classOfSecondBox === undefined){
    return true;
  } else {
    return false;
  }
};

//Based on the current player, the user move is made
Domineering.playMove = function(e) {
  if (this.currPlayer === 'Player A') {
    Domineering.makeAmove.call(game, e);
  } else {
    Domineering.makeBmove.call(game, e);
  }
};

//Game play functionality needs to be added to each square
Domineering.addButtonFunctionality = function() {
  $('li').on('click', Domineering.playMove.bind(game));
};


//Based on the user input the GUI is generated
Domineering.createBoard = function () {
  $('#gameBoard').append('<h1>Domineering<h1>');
  $('#gameBoard').append('<hr>');
  $('#gameBoard').find('hr').css('width', '670px');

  $('#gameBoard').append('<p id="currentPlayer"> Current Player: ' + this.playerA + '</p>');

  $('#gameBoard').append('<div id="leftPlayer">' + this.playerA + '</div>');
  $('#leftPlayer').append('<br> <br> <img src="images/PlayerAtile.png" alt="PlayerAtile">');
  $('#leftPlayer').append('<br> <br> <p id="availableMovesA"> Available Moves: ' + (this.base * (this.base-1)) + '</p>');

  $('#leftPlayer').css('width',200);
  // $('#leftPlayer').css('height',(25 * this.base));
  $('#gameBoard').append('<div id="gameGrid"></div>');

  $('#gameGrid').append('<ul></ul>');
  for (var i = 0; i < (this.base * this.base); i++) {
    var $square = $('<li></li>');
    $square.attr('id', i);
    $('ul').append($square);
  }
  $('ul').css('width',(50 * this.base));
  $('ul').css('height',(50 * this.base));

  $('#gameBoard').append('<div id="rightPlayer">' + this.playerB + '</div>');
  $('#rightPlayer').append('<br> <br> <img src="images/PlayerBtile.png" alt="PlayerBtile">');
  $('#rightPlayer').append('<br> <br> <p id="availableMovesB"> Available Moves: calculating... </p>');
  $('#rightPlayer').css('width',200);
  // $('#rightPlayer').css('height',(25 * this.base));

  $('#gameBoard').css('width',1050);
  $('#gameBoard').css('height',850);

  $('#gameBoard').append('<button type="button" id="reset">Reset</button>');
  $('#reset').css('clear', 'both');
  $('#gameBoard').on('click', '#reset', Domineering.resetGame);

  Domineering.addButtonFunctionality.call(game);
};

//Based on the user input, the game object is set up (internally)
Domineering.setupGame = function(e) {
  e.preventDefault();
  $('.welcome').hide();
  if ($('#small').prop('checked')) {
    game = new Domineering(5);
  } else if ($('#medium').prop('checked')) {
    game = new Domineering(7);
  } else {
    game = new Domineering(9);
  }
  game.playerA = $('#playerAname').val();
  game.playerB = $('#playerBname').val();

  $('#userInputForm').hide();

  Domineering.createBoard.call(game);
};

//Add event listener to the player input form - they enter usernames //and select the game difficulty before the gameboard is generated.
Domineering.playersDetails = function() {
  $('#userInputForm').on('submit', Domineering.setupGame);
};

//Wait for the page to load
document.addEventListener('DOMContentLoaded', Domineering.playersDetails);
