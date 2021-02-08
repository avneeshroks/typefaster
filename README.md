## Typefaster: A Simple Multiplayer Game UI - :tada:

The games will be played between 2 users. Who will be able to type correctly a
given sentence, in the smallest amount of time, will win the game!

### Instructions to run on local machine

#### Server Side : 
1. Clone the typefaster-server https://github.com/avneeshroks/typefaster-server in local machine
2. Navigate to cloned directory
3. Run ```npm install``` or ```yarn install```
4. Run ```npm start``` or `yarn start`
5. Server should be running @ http://localhost:8080
6. Leave it running

#### Client Side : 
1. Clone the repository in the local machine 
2. Navigate to the cloned directory
3. Run ```npm install``` or ```yarn install```
4. Run ```npm start``` or `yarn start`
5. Open http://localhost:3000 in the browser window to see the app running

P.S : Make sure ports are correct.

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

### Server side implementation using sockets :smile: 

* Havve used Node.js, Socket.io, Express.js
* Client connecting and generating their usernames
* Create Socket connections between client and server
* Created channel logic where there coculd be only two users can be connected to make it multiplayer
* Client gets registered to the game channel when they click on play, first user has to wait for the second one to join
* Once next user joins the Countdown starts based on subscription from socket
* As soon as any of the user finishes the time and username is broadcasted from the user to the connected client so that winner screen comes up
