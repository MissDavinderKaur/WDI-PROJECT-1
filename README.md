# WDI\_PROJECT\_1: Domineering

##Overview
I recreated this game for my first project, assigned on the 12-week Web Development Immersive course at General Assembly in London. It was built using basic HTML, CSS and JavaScript/jQuery.

The game can be found here

##Code Overview
In order to build this game, I decided to start by writing pseudo code for the game logic:
The game is played by 2 players. The players take it in turns to place their tiles: one player can only place their tiles vertically and the other horizontally. The game is won by the player who makes the last move.

##Planning
I used an OOP approach to building this app. The code was written based on the above pseudo code. So I started by writing the code to create and display the game board (based on the user input) and then moved on to the play move functionality. There was some logic to be built into this as the Player playing vertically could not place their tiles on the bottom row. Similarly, the Player playing horizontally could not play in the last column. Once all of the play logic had been built, the final bit to make the game work was win logic. This took a considerable amount of time to code as it involved a constant calulation of available moves.
The final step to getting the app demo ready was to complete the styling.

##Successes
Building the win-logic for this game was definitely the most challenging but rewarding part of the app. I was able to reuse some of the game play logic so was able to keep the code dry.

##Challenges
The biggest challenge I faced was working out how to tackle the win logic! I wasn't able to pseudo code it but wanted to write the JavaScript code for it. This is obviously a recipe for failure. So I spent a long time rubber-ducking how exactly the logic would work, until I was able to write concise pseudo code. From this I was able to start writing the code (and reusing where I could)
 
##Next Steps
I would like to add multiplayer functionality (up to 4 people) and also allow the players to decide which size of tile they would like to play (instead of just a standard size)
