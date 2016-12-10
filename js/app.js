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
  console.log('changed player to ' + this.currPlayer);
};

Domineering.playMove = function(e) {
  if (e.target.getAttribute('class') === null) {
    if (this.currPlayer === 'Player A') {
      e.target.setAttribute('class', 'Aplayed');
      var secondBoxA = parseInt(e.target.id) + this.base;
      document.getElementById(secondBoxA).setAttribute('class', 'Aplayed');
      Domineering.changePlayer();
    } else {
      e.target.setAttribute('class', 'Bplayed');
      var secondBoxB = parseInt(e.target.id) + 1;
      document.getElementById(secondBoxB).setAttribute('class', 'Bplayed');
      Domineering.changePlayer();
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
