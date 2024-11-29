const { Server } = require('socket.io')

const socketConnection = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === 'production' ? 'https://chithibox.vercel.app' : 'http://localhost:3000'
        }
    })

    io.on('connection', (socket) => {
        socket.on('chithibox', id => {
            console.log('New user connected', id)
            socket.join(id)
        })

        //=============mail==============

        //sent
        socket.on('sent', id => {
            socket.to(id).emit('incoming',{id: id})
        })
    })
}

module.exports = socketConnection