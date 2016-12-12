function Domineering (base) {
  this.base = base;
  this.currPlayer = 'Player A';
}

var Domineering = new Domineering(8);


Domineering.start = function() {
  Domineering.createBoard();
};

Domineering.changePlayer = function() {
  if (this.currPlayer === 'Player A'){
    this.currPlayer = 'Player B';
  } else {
    this.currPlayer = 'Player A';
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
        alert('Player A (blue) cannot make a move therfore Player B (red) has won');
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
        console.log('player B has options');
        this.changePlayer();
      } else {
        alert('Player B (red) cannot make a move therfore Player A (blue) has won');
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

document.addEventListener('DOMContentLoaded', Domineering.start);
