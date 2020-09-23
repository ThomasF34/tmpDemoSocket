const express = require('express')();
const http = require('http').createServer(express);
const socket = require('socket.io')(http);

express.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

socket.on('connection', (userSocket) => {
  console.log("Un nouvel utilisateur s'est connecté");

  userSocket.on('felicitation-connection', () => {
    console.log('Bravo SuperBackEnd, tu as réussi à te connecter en SocketIO avec un utilisateur');
  })

  userSocket.on('new-message', (message) => {
    console.log(`Je vais enregistrer le message suivant dans ma base de donnée: ${message}`);
    userSocket.broadcast.emit('message-received', message);
  })
})



http.listen(3000, () => console.log("J'écoute sur 3000"));

