# The Game Of Prompts

A full stack multiplayer party app where users can submit and match responses to a prompt. 
Deployed App: https://game-of-prompts.herokuapp.com/

To run this application, you need to create a .env file. 
Inside this .env file, create a ```SERVER_SECRET``` variable, and set it to any string.
Next, run ```npm install``` in the route directory. 
Then, cd to the client directory and run ```npm install```.
Lastly, run ```npm start```.

USER STORY: 
As a person who enjoys playing games with friends, I would like to 
* Be able to play a fun, prompt based party game
* Be able to play locally on one device or online across many devices
* Be able to test how well my friends and I know each other.

TECHNOLOGIES USED:
* React
* Redux
* NodeJS
* Express
* MondoDB & Mongoose
* PassportJS & BCrypt
* Socket.io used for real-time communication between database and server
* Custom UI created by John Humbracht (https://github.com/jhumbrac) 

AUTHORS:
* Zack Moscow (https://github.com/zackmoscow)
* John Humbracht (https://github.com/jhumbrac)
* Tony Sarni (https://github.com/Vitalian17)
* Nick Cox (https://github.com/nich-o-las)