var socket = require("socket.io"),
	app = require("express")(),
	io = socket.listen(app.listen(8080));

//для express
app.get("/", (req, res) => {
	res.sendfile(__dirname + "/index2.html");
});

//для сокетов. когда произойдет соединение
io.sockets.on("connection", client => {
	client.on("message", data => {
		client.emit("hello", {hello: "Hi " + data});
		client.broadcast.emit("hello", "Привет от " + data);
	});

	client.on("disconnect", () => {
		io.sockets.emit("hello", {hello: "Один из нас вышел из сети"});
	});
});