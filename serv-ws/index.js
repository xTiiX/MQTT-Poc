const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8082 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});
