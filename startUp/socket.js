// {} represents destruct https://stackoverflow.com/questions/38660022/curly-brackets-braces-in-node-js-require-statement
const { instrument } = require("@socket.io/admin-ui");
const constants = require('../utility/constants')
const socketDebugger = require('debug')('socket');

module.exports = function (server) {
    // socket server
    const io = require('socket.io')(server, {
        cors: {
            origin: ["http://192.168.0.100:3000", "https://admin.socket.io"],
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });

    // configure socket admin on web page
    instrument(io, { auth: false });

    // io.on("connection", (socket) => {
    //     socketDebugger("socket connected:" + socket.id);
    //     socket.on('chat_message', (msg) => {
    //         socketDebugger('message: ' + msg);
    //     });

    //     socket.on("disconnect", () => {
    //         socketDebugger("disconnected!");
    //     });
    // });

    io.on('connection', socket => {
        socketDebugger("socket connected:" + socket.id);
        const id = socket.handshake.query.id
        socket.join(id)
      
        socket.on('send-message', ({ recipients, text }) => {
          recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
              recipients: newRecipients, sender: id, text
            })
          })
        })
      })

    // pc side :http://192.168.0.113:3000/webSocket/test.html
    server.listen(constants.socketPort, () => socketDebugger("socket server running on port:" + constants.socketPort));
}