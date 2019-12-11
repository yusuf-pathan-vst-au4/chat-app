const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const port = process.env.PORT || 9090;


//set the template engine ejs
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use('/public', express.static('public'));


//routes
app.get('/', function(req, res){
	res.render('home');
})

//Listen on port 
server = app.listen(port);
console.log(port);



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', function(socket){
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', function(data){
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', function(data){
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', function(data){
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})