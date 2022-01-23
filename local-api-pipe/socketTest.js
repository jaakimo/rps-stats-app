const wsc = require('websocket').client;

const client = new wsc();

client.on('connect', (connection) => {
  console.log('connected');
  connection.on('error', (err) => console.log('Error', err));
  connection.on('message', (message) =>
    console.log(`message`, JSON.parse(message.utf8Data)),
  );
});
client.connect('wss://bad-api-assignment.reaktor.com/rps/live');
