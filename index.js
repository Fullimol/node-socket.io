const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// handlebars
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: "hbs"
}))
app.set("view engine", "hbs")

app.get('/', (req, res) => {
    res.render('home')
})

// WEBSOCKET (socket.io)
const server = require('http').Server(app) //crea un servidor HTTP que está listo para manejar las solicitudes HTTP que llegan a tu aplicación Express.
const ioServidor = require('socket.io')(server) //crea una instancia de Socket.IO y la adjunta al servidor HTTP y habilita la funcionalidad de WebSocket

ioServidor.on('connection', (socketCliente) => { //"socketCliente" es el cliente conectado.
    //aca va lo que quiero hacer cuando el cliente se conecte o realice una acción.
    console.log('Nuevo cliente conectado: ' + socketCliente.id)
    socketCliente.emit("ejemplo-nombre del mensaje", "Aca va el mensaje en sí")
    socketCliente.emit("chat message", "Bienvenido a la sala de chat")

    //el mensaje que el cliente envíe al servidor lo recibe "ioServidor" osea, se renviará a cada cliente que se conecte a ese server.
    socketCliente.on('chat message', (mensaje) => {
        ioServidor.emit('chat message', mensaje)
    })
})



server.listen(8080, () => {
    console.log("servidior iniciado en 8080")
})