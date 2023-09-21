const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const exphbs = require('express-handlebars')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))

app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: "hbs"
}))

app.set("view engine", "hbs")

app.get('/', (req, res) => {
    res.render('home')
})

// WEBSOCKET:
const server = require('http').Server(app) //crea un servidor HTTP que está listo para manejar las solicitudes HTTP que llegan a tu aplicación Express.
const io = require('socket.io')(server) //crea una instancia de Socket.IO y la adjunta al servidor HTTP y habilita la funcionalidad de WebSocket

io.on("connection", function (socketCliente) { //"socketCliente" es el cliente conectado.
    //aca va lo que quiero hacer cuando el cliente se conecte.
    console.log("nuevo cliente conectado");
    socketCliente.emit("mensaje", "Bienvenido")
})

app.listen(8080, () => {
    console.log("servidior iniciado en 8080")
})