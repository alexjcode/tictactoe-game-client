# Tic Tac Toe Project

## Technologies Used
- Atom
- Git
- GitHub
- SASS
- Node Dependencies
- JavaScript
- jQuery
- tic-tac-toe-wdi API
- Photoshop

## Planning
First I created the sign in functionality, and the game winning logic. I used a numbered tag on each clickable div, allowing me to tie each div to an index that could be sent to the api. Each square of the board is clickable, and highlights on a mouse hover. My largest bug was a unique one caused by using images instead of letters on the board. This causes the event's index to be NaN. I fixed this by eliminating these scenarios for the new-move logic. Another was getting the counter to update properly, as well as other bugs related to promises. I learned that JS can be picky in regards to how functions are split up.

## Unsolved problems
- Add a win / lose / draw popup in the future
- The win counter is occasionally buggy, although it could just be slow internet. I would like to investigate other methods of verifying outcome
- Stopping a game after the outcome is reached
- CSS overhaul
- Online Multiplayer

## Wireframes
<img src="https://i.imgur.com/0cXIyim.png" width="43%" alt="Desktop Wireframe"> <img src="https://i.imgur.com/phurmka.png" width="29.5%" alt="Tablet Wireframe">
<img src="https://i.imgur.com/VjJCzwu.png" width="22%" alt="Mobile Wireframe">
Desktop / Tablet / Mobile

## Version control
I commited about once for every hour of work. Using git, i worked on a brach of the main repository, and merged to the main after adding features with working code, in order to separate the testing code from the main code.
