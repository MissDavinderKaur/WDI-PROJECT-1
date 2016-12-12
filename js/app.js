var game;

function Domineering (base) {
  this.base = base;
  this.playerA;
  this.playerB;
  this.currPlayer = 'Player A';
}

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


//Check for any 2 boxes (one above another)that are empty. If there are any, then the //user has options and so play can continue.
Domineering.canPlayerAmove = function() {
  var options = 0;
  for (var i = 0; i < ((this.base * this.base) - this.base); i++) {
    var possibleSecondBoxA = i + this.base;
    if (Domineering.checkBoxes(i, possibleSecondBoxA)) {
      options++;
    }
  }

  if (options > 0) {
    return true;
  } else {
    return false;
  }
};

//Check for any side-by-side boxes that are empty. IF there are any, then the //user has options and so play can continue.
Domineering.canPlayerBmove = function() {
  var options = 0;
  for (var i = 0; i < ((this.base * this.base) -1); i++) {
    var possibleSecondBoxB = i + 1;
    if (Domineering.checkBoxes(i, possibleSecondBoxB)) {
      options++;
    }
  }

  if (options > 0) {
    return true;
  } else {
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
    $('#' + square2).attr('class', 'Aplayed');
  }
};

//Using the checkBoxes method, work out if the two boxes are empty. if so //then the move selected by Player A is valid and can be made. Then if Player //A can make a move, change the player otherwise alert winner.
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
        $('#currentPlayer').html(this.playerA + ' cannot make a move. Therefore the winner is ' + this.playerB);
      }
    }
  }
};

//Using the checkBoxes method, work out if the two boxes are empty. if so //then the move selected by Player A is valid and can be made. Then, if //Player B is able to make a move then change the player otherwise alert winner.
Domineering.makeAmove = function (e) {
  if (e.target.id < ((this.base * this.base) - this.base)) {
    var secondBoxA = parseInt(e.target.id) + this.base;
    if (Domineering.checkBoxes(e.target.id, secondBoxA)) {
      Domineering.changeBoxColor('Player A', e.target.id, secondBoxA);
      if (Domineering.canPlayerBmove.call(game)){
        Domineering.changePlayer.call(game);
      } else {
        $('#currentPlayer').html(this.playerB + ' cannot make a move. Therefore the winner is ' + this.playerA);
      }
    }
  }
};

//internal method to check the classes of the 2 boxes selected by each user
Domineering.checkBoxes = function (boxOne, boxTwo){
  var classOfBoxOne = (document.getElementById(boxOne)).getAttribute('class');
  var classOfSecondBox = (document.getElementById(boxTwo)).getAttribute('class');

  if(classOfBoxOne === null && classOfSecondBox){
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
  var squares = document.getElementsByTagName('li');
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', Domineering.playMove.bind(game));
  }
};

//Based on the user input the GUI is generated
Domineering.createBoard = function () {
  $('#leftPlayer').html(this.playerA);
  $('#rightPlayer').html(this.playerB);
  $('#currentPlayer').html('Current player: ' + this.playerA);

  var body = document.getElementById('gameGrid');
  var grid = document.createElement('ul');
  body.appendChild(grid);
  for (var i = 0; i < (this.base * this.base); i++) {
    var square = document.createElement('li');
    square.setAttribute('id', i);
    grid.appendChild(square);
  }
  $('ul')[0].style.width = (50 * this.base) + 'px';
  $('ul')[0].style.height = (50 * this.base) + 'px';

  Domineering.addButtonFunctionality.call(game);
};

//Based on the user input, the game is set up (internally)
Domineering.setupGame = function(e) {
  e.preventDefault();
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

//Add event listener to the player input form - they enter usernames and //select the game difficulty
Domineering.playersDetails = function() {
  $('#userInputForm').on('submit', Domineering.setupGame);
};

//Wait for the page to load
document.addEventListener('DOMContentLoaded', Domineering.playersDetails);
