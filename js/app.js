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

Domineering.changeBoxColor = function(player, square) {
  if (player === 'Player A'){
    document.getElementById(square).setAttribute('class', 'Aplayed');
  } else {
    document.getElementById(square).setAttribute('class', 'Bplayed');
  }
};

Domineering.makeAmove = function (e) {
  if (e.target.id < ((this.base * this.base) - this.base)) {
    this.changeBoxColor('Player A', e.target.id);
    var secondBoxA = parseInt(e.target.id) + this.base;
    this.changeBoxColor('Player A', secondBoxA);
    this.changePlayer();
  }
};

Domineering.makeBmove = function (e) {
  var unallowedIndexes = [];
  for (var i = 1; i <= this.base; i++) {
    unallowedIndexes.push((i * this.base) -1);
  }

  console.log(unallowedIndexes);
  console.log(e.target.id);

  if (unallowedIndexes.indexOf(parseInt(e.target.id)) !== -1) {
    //user is not allowed to make this move
  } else {
    this.changeBoxColor('Player B', e.target.id);
    var secondBoxB = parseInt(e.target.id) + 1;
    this.changeBoxColor('Player B', secondBoxB);
    this.changePlayer();
  }
};

Domineering.playMove = function(e) {
  if (e.target.getAttribute('class') === null) {
    if (this.currPlayer === 'Player A') {
      this.makeAmove(e);
    } else {
      this.makeBmove(e);
    }
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
