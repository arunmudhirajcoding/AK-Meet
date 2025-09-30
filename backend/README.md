to start the backend use npm init

tech stack for backend
- nodejs
- express
- nodemon
- bcrypt
- cors
- dotenv
- http status
- socket.io
- mongoose
- jwt

## folder structure
```
backend
    |--node_modules --> create by run `npm i`
    |--src
        |--controllers
        |--models
        |--routes
        |--config
        |--middlewares
        |--utils
        |--app.js
    |--package.json
    |--.env
```

## creating mongodb atlas account
- go to https://www.mongodb.com/
- click on try free
- create a new account
- create a new project
###  create a new cluster
- click on clusters
- click on create cluster
- choose a cloud provider and region
- add password and user
- click on create cluster

### network access
- ip whitelist
- click on network access
- click on add ip address
- click on allow access from anywhere if dev stage or add your ip address if prod stage
- click on close

### connect to cluster
- click on connect
- click on connect your application
- copy the connection string
- paste it in the .env file
- replace <password> with your password

### password forgot 
- click on database access
- click on reset password
- enter your email and click on reset password
- check your email and click on reset password
- enter your new password and click on change password

### local workspace
- copy the connection string in mongodb atlas
- paste it in the .env file
- save the .env file

## models 
- user model
- meeting model


## app.js
import: express, createServer from node:http,server from socket.io, mongoose, dotenv, cors, http-status, bcrypt, jwt

**CreateServer** and **Server** are use to connect 2 diff server of express and socket.io like createServer 
    |- Server
    |- io
    |- app --> express app
so we listen parent class (i.e server)

# What we do in production in io server config

Instead of origin: "*", you restrict origins to only your trusted frontend domains.
For example, if your React frontend is deployed at https://myzoomclone.com, you’d do:

~~~
const io = new Server(server, {
  cors: {
    origin: ["https://myzoomclone.com"],  // ✅ allow only your frontend
    methods: ["GET", "POST"],             // allow only needed methods
    allowedHeaders: ["Authorization", "Content-Type"], // ✅ only required headers
    credentials: true,                     // only works safely with restricted origins
  },
});
~~~

### 🔹 Typical best practices in production

1. Whitelist origins
  origin: process.env.CLIENT_URL // e.g., https://myzoomclone.com
2. You can even make it an array if you support multiple domains:
  origin: ["https://app1.com", "https://app2.com"]

### 🔹 Why we do this in development

1. origin: "*" → allows any frontend (React app running on localhost:3000, Postman, etc.) to connect.
2. allowedHeaders: ["*"] → lets clients send any headers without restrictions.
3. It makes development fast & flexible — you don’t need to worry about CORS errors when testing.
👉 In short: In dev, we trust the environment and just “open the gates” so things work easily.

### events in socket
a. connection
  1. join-call ( create room with socketid and timestamp)
    1.1. user-joined (add user in room and send the room info to that user and others in that room)
    1.2. chat-message ( server send the chat history to the new user)
  2. signal (establish connection)
  3. chat-message (store the room and socketid, msg:sender,data,socketid, send that msg to all users in that room except sender)
  4. disconnect ( parse the connections,remove users and delete room, duration of room)
    4.1. user-left (msg to user left and remove that user from room)

## Notes / pitfalls:

The server finds only the first room that contains the socket — if you intended sockets can be in multiple rooms, this will only return the first room found. In this app design it seems sockets have one room, so it's OK.

Storing all messages in memory means messages will grow indefinitely — for production use you’d persist to a DB or cap history length.

# user controllers 
- register user ( we get name,username, password)
  1. check if user already exist
  2. hash the password
  3. create user
  4. save user in db
  5. return user
- login user ( we get username, password)
  1. check if user exist
  2. check if password is correct
  3. create a token and send it to client
  4. return user
- get user history (we get token from client)
  1. check if token is valid
  2. get user from token
  3. return user history of meetings
- create a history (we get token from client and meetingCode)
  1. check if token is valid
  2. get user from token
  3. create a history of meeting by meetingCode and username from token 
  4. return history of meeting







## Note:
- keep moduler and separation of concerns
- check functions properly
- import file name properly
- save credenticals as tokens in db
- use logs to debug

