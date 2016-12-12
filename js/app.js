function Domineering (base) {
  this.base = base;
  this.playerA;
  this.playerB;
  this.currPlayer = 'Player A';
}

Domineering.changePlayer = function() {
  if (this.currPlayer === 'Player A'){
    this.currPlayer = 'Player B';
    document.getElementById('currentPlayer').innerHTML = 'Current Player: ' + this.PlayerB;
  } else {
    this.currPlayer = 'Player A';
    document.getElementById('currentPlayer').innerHTML = 'Current Player: ' + this.PlayerA;
  }
};

// Can Player A/Blue/vertical make a move?
Domineering.canPlayerAmove = function() {
  var options = 0;
  for (var i = 0; i < ((this.base * this.base) - this.base); i++) {
    var classOfIndex = (document.getElementById(i)).getAttribute('class');
    var possibleSecondBoxB = i + this.base;
    var classOfSecondBox = (document.getElementById(possibleSecondBoxB)).getAttribute('class');

    if (classOfIndex === null && classOfSecondBox === null) {
      options++;
    }
  }

  if (options > 0) {
    console.log('Player A has ' + options + ' available');
    return true;
  } else {
    return false;
  }
};

// Can Player B/Red/Horizonatal make a move?
Domineering.canPlayerBmove = function() {
  var options = 0;
  for (var i = 0; i < ((this.base * this.base) -1); i++) {
    var classOfIndex = (document.getElementById(i)).getAttribute('class');
    var possibleSecondBoxB = i + 1;
    var classOfSecondBox = (document.getElementById(possibleSecondBoxB)).getAttribute('class');

    if (classOfIndex === null && classOfSecondBox === null) {
      options++;
    }
  }

  if (options > 0) {
    console.log('Player B has ' + options + ' available');
    return true;
  } else {
    return false;
  }
};

Domineering.changeBoxColor = function(player, square) {
  if (player === 'Player A'){
    document.getElementById(square).setAttribute('class', 'Aplayed');
  } else {
    document.getElementById(square).setAttribute('class', 'Bplayed');
  }
};

Domineering.makeBmove = function (e) {
  var unallowedIndexes = [];
  for (var i = 1; i <= this.base; i++) {
    unallowedIndexes.push((i * this.base) -1);
  }

  if (unallowedIndexes.indexOf(parseInt(e.target.id)) !== -1) {
    //user is not allowed to make this move
  } else {
    var secondBoxB = parseInt(e.target.id) + 1;
    if (e.target.getAttribute('class') === null &&
    document.getElementById(secondBoxB).getAttribute('class') === null) {
      this.changeBoxColor('Player B', e.target.id);
      this.changeBoxColor('Player B', secondBoxB);
      if (Domineering.canPlayerAmove()){
        console.log('player A has options');
        this.changePlayer();
      } else {
        document.getElementById('currentPlayer').innerHTML = this.playerA + ' cannot make a move. Therefore the winner is ' + this.playerB;
      }
    }
  }
};

Domineering.makeAmove = function (e) {
  if (e.target.id < ((this.base * this.base) - this.base)) {
    var secondBoxA = parseInt(e.target.id) + this.base;
    if (e.target.getAttribute('class') === null &&
    document.getElementById(secondBoxA).getAttribute('class') === null) {
      this.changeBoxColor('Player A', e.target.id);
      this.changeBoxColor('Player A', secondBoxA);
      if (Domineering.canPlayerBmove()){
        this.changePlayer();
      } else {
        document.getElementById('currentPlayer').innerHTML = this.playerB + ' cannot make a move. Therefore the winner is ' + this.playerA;
      }
    }
  }
};

Domineering.playMove = function(e) {
  if (this.currPlayer === 'Player A') {
    this.makeAmove(e);
  } else {
    this.makeBmove(e);
  }
};

Domineering.addButtonFunctionality = function() {
  var squares = document.getElementsByTagName('li');
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', Domineering.playMove.bind(this));
  }
};

Domineering.createBoard = function () {
  document.getElementById('playerA').innerHTML = this.playerA;
  document.getElementById('playerB').innerHTML = this.playerB;
  document.getElementById('currentPlayer').innerHTML = 'Current player: ' + this.playerA;

  var body = document.getElementById('gameGrid');
  var grid = document.createElement('ul');
  body.appendChild(grid);
  for (var i = 0; i < (this.base * this.base); i++) {
    var square = document.createElement('li');
    square.setAttribute('id', i);
    grid.appendChild(square);
  }
  Domineering.addButtonFunctionality();
};

Domineering.setupGame = function(e) {
  e.preventDefault();
  var game;
  if (document.getElementById('small').checked) {
    game = new Domineering(5);
  } else if (document.getElementById('medium').checked) {
    game = new Domineering(7);
  } else {
    game = new Domineering(9);
  }
  game.playerA = document.getElementById('playerAname').value;
  game.playerB = document.getElementById('playerBname').value;

  document.getElementById('userInputForm').style.display = 'none';

  Domineering.createBoard.call(game);
};

Domineering.getPlayersDetails = function() {
  document.getElementById('userInputForm').addEventListener('submit', Domineering.setupGame);
};

document.addEventListener('DOMContentLoaded', Domineering.getPlayersDetails);
