import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let clientsNames = {};

wss.on("connection", client => {
	if (!clientsNames[client]) {
		clientsNames[client] = "User " + Math.floor((Math.random() * 100));
		console.log(clientsNames);
	}
	client.on("message", (message, isBinary) => {
		[...wss.clients]
			.filter(c => c !== client)
			.forEach(c => c.send((isBinary ? message.toString() : message)));
	})
});