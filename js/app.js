var game;

function Domineering (base) {
  this.base = base;
  this.playerA;
  this.playerB;
  this.currPlayer = 'Player A';
}

Domineering.changePlayer = function() {
  console.log('wanting to change player', this);
  if (game.currPlayer === 'Player A'){
    game.currPlayer = 'Player B';
    document.getElementById('currentPlayer').innerHTML = 'Current Player: ' + game.playerB;
  } else {
    game.currPlayer = 'Player A';
    document.getElementById('currentPlayer').innerHTML = 'Current Player: ' + game.playerA;
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
      Domineering.changeBoxColor('Player B', e.target.id);
      Domineering.changeBoxColor('Player B', secondBoxB);
      if (Domineering.canPlayerAmove.call(game)){
        Domineering.changePlayer.call(game);
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
      Domineering.changeBoxColor('Player A', e.target.id);
      Domineering.changeBoxColor('Player A', secondBoxA);
      if (Domineering.canPlayerBmove.call(game)){
        Domineering.changePlayer.call(game);
      } else {
        document.getElementById('currentPlayer').innerHTML = this.playerB + ' cannot make a move. Therefore the winner is ' + this.playerA;
      }
    }
  }
};

Domineering.playMove = function(e) {
  if (this.currPlayer === 'Player A') {
    Domineering.makeAmove.call(game, e);
  } else {
    Domineering.makeBmove.call(game, e);
  }
};

Domineering.addButtonFunctionality = function() {
  var squares = document.getElementsByTagName('li');
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', Domineering.playMove.bind(game));
  }
};

Domineering.createBoard = function () {
  document.getElementById('leftPlayer').innerHTML = this.playerA;
  document.getElementById('rightPlayer').innerHTML = this.playerB;
  document.getElementById('currentPlayer').innerHTML = 'Current player: ' + this.playerA;

  var body = document.getElementById('gameGrid');
  var grid = document.createElement('ul');
  body.appendChild(grid);
  for (var i = 0; i < (this.base * this.base); i++) {
    var square = document.createElement('li');
    square.setAttribute('id', i);
    grid.appendChild(square);
  }
  document.getElementsByTagName('ul')[0].style.width = (50 * this.base) + 'px';
  document.getElementsByTagName('ul')[0].style.height = (50 * this.base) + 'px';

  Domineering.addButtonFunctionality.call(game);
};

Domineering.setupGame = function(e) {
  e.preventDefault();
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
