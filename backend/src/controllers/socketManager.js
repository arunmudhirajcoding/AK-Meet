import { Server } from "socket.io"; //socket server

let connections = {}; // no. of connection or users in a room
let messages = {};
let timeOnline = {}; // time when user joined the room

export const connectToSocket = (server) => {
	//express server
	//create socket server
	const io = new Server(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"], // allow get and post methods to io server
			allowedHeaders: ["*"], // important but not to use in production
			credentials: true,
		},
	});

	//1. when client connect to server then this event will be called
	io.on("connection", (socket) => {
		console.log("SOMETHING CONNECTED");

		//1. when client emit join-call event then this event will be called
		socket.on("join-call", (path) => {
			// event-name can be anything but it should be same as client side(frontend). it might be join-call,accept-call

			if (connections[path] === undefined) {
				connections[path] = [];
			}
			connections[path].push(socket.id); // add socket id to connections array

			timeOnline[socket.id] = new Date();

			// connections[path].forEach(elem => {
			//     io.to(elem)
			// })

			for (let a = 0; a < connections[path].length; a++) {
				io.to(connections[path][a]).emit(
					"user-joined",
					socket.id,
					connections[path]
				); // gives msg that user joined
			}

			if (messages[path] !== undefined) {
				for (let a = 0; a < messages[path].length; ++a) {
					io.to(socket.id).emit(
						"chat-message",
						messages[path][a]["data"],
						messages[path][a]["sender"],
						messages[path][a]["socket-id-sender"]
					); // send msg to client with info of msg,sender name,sender id
				}
			}
		});
		//2. when client emit signal event then this event will be called
		socket.on("signal", (toId, message) => {
			io.to(toId).emit("signal", socket.id, message);
		});

		//3. when client emit chat-message event then this event will be called
		socket.on("chat-message", (data, sender) => {
			const [matchingRoom, found] = Object.entries(connections).reduce(
				([room, isFound], [roomKey, roomValue]) => {
					// const connections = {
					// 	room1(roomkey): ["socket123", "socket456"],(roomvalue)
					// 	room2(roomkey): ["socket789"],(roomvalue)
					// };
					if (!isFound && roomValue.includes(socket.id)) {
						return [roomKey, true];
					}
					return [room, isFound];
				},
				["", false]
			);

			if (found === true) {
				if (messages[matchingRoom] === undefined) { // after the users in room we create a message array to store
					messages[matchingRoom] = [];
				}

				messages[matchingRoom].push({
					sender: sender,
					data: data,
					"socket-id-sender": socket.id,
				});// we store sender name, msd, sender id
				console.log("message", matchingRoom, ":", sender, data);

				connections[matchingRoom].forEach((elem) => {
					io.to(elem).emit("chat-message", data, sender, socket.id);
				});
			}
		});

		//4. when client disconnect from server then this event will be called
		socket.on("disconnect", () => {
			var diffTime = Math.abs(timeOnline[socket.id] - new Date());

			var key;

			for (const [k, v] of JSON.parse(
				JSON.stringify(Object.entries(connections))
			)) {
				for (let a = 0; a < v.length; ++a) {//v : members , k : roomId
					if (v[a] === socket.id) {
						key = k;

						for (let a = 0; a < connections[key].length; ++a) {
							io.to(connections[key][a]).emit(
								"user-left",
								socket.id
							);// remove user with his id from connections array
						}

						var index = connections[key].indexOf(socket.id);

						connections[key].splice(index, 1);

						if (connections[key].length === 0) {
							delete connections[key];
						}// no user left in room then delete room
					}
				}
			}
		});
	});

	return io;
};
