## Typefaster: A Simple Multiplayer Game UI - :tada:

The games will be played between 2 users. Who will be able to type correctly a
given sentence, in the smallest amount of time, will win the game!

### Instructions to run on local machine
1. Clone the repository in the local machine 
2. Navigate to the cloned directory
3. run ```npm install```
4. run ```npm start```
5. open http://localhost:3000 in the browser window to see the app running

### Implementation :

* The implementation uses React.js
* Implemented using functional programming and hooks
* Entry point is the App.js
* App component conditionally runs the game and it's different coponents
  * Welcome - Greets user and has play button
    * usernameGenerator : generation random username using collection of name of stars and name of fruits and concatinating them with _
  * Countdown - 3..2..1..Screen : Simple setInterval implementaion, clears interval when countdown reaches 1
  * Game -
    * Contains randomly generated text(unselectable by user so they cant directly paste)
    * Input textarea - Allows user to start typing with focused as soon as renderd
    * Enter Keypress submits the game when the typed value is correct
    * Submit button - Enabled when the typed value is correct otherwise disabled
  * Winner Screen - Gets the previously randomly generated username from sessionStorage, shows the time in XXs XXXms

### Currently the implementaion is only a UI side implementation - Couldn't get the time to imeplement Server side
#### Jotting down some of the thought process though : :smile: 

* Would use Node.js, Redis, Socket.io, Express.js
* Had ideas to generate the users from backend
* Create Socket connections between client and server
* Each game would be a pub/sub channel created on Redis - which connects two clients
* Once both the clients are connected - start the game
  * Server will publish the start event
  * Client will run 3 second timer
  * Client publishes Start time
  * When either of the client finishes, record end time - client publishes end time
  * Server publishes end-game-event, with winner's time
  * Cient responds with unmounting Game and mounting Winner
