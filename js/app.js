function Domineering (base) {
  this.base = base;
  this.currPlayer = 'Player A';
}

var Domineering = new Domineering(8);


Domineering.start = function() {
  Domineering.createBoard();
};


Domineering.changePlayer = function(){
  if (this.currPlayer === 'Player A'){
    this.currPlayer = 'Player B';
  } else {
    this.currPlayer = 'Player A';
  }
  console.log(this.currPlayer);
};

Domineering.playMove = function(e){
  console.log(e.target);
  console.log('I have been clicked');
  Domineering.changePlayer();
};

Domineering.addButtonFunctionality = function() {
  var squares = document.getElementsByTagName('li');
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', Domineering.playMove);
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

// SoundBoard.addLyrics = function() {
//   var tiles = document.getElementsByTagName('li');
//   for (var i = 0; i < tiles.length; i++) {
//     tiles[i].innerHTML = soundClipArray[i].title;
//   }
// };
//
// SoundBoard.addAudioTag = function() {
//   var audio = document.createElement('audio');
//   audio.setAttribute('id', 'audio');
//
//   var body = document.getElementsByTagName('body')[0];
//   body.appendChild(audio);
// };
//
// SoundBoard.addButtonFunctionality = function() {
//   var tiles = document.getElementsByTagName('li');
//
//   for (var i = 0; i < tiles.length; i++) {
//     tiles[i].addEventListener('click', SoundBoard.assignSoundClip(i));
//   }
// };
//
// SoundBoard.assignSoundClip = function(i) {
//   var audio = document.getElementById('audio');
//   audio.src = soundClipArray[i].wavFile;
//   audio.play();
// };
