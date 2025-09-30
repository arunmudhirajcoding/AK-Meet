## folder structure
```
frontend
 ├── public
 ├── src
 │   ├── context
 │   ├── context
 │   ├── components
 │   ├── pages
 │   ├── utils
 │   ├── App.js
 │   ├── index.js
 ├── package.json
 ├── README.md
```

### tools used
- react.js
- material-ui and its icons
- axios
- vanilla css
- http-status
- socket.io-client

## pages
- landing page (Home page ,url:'/')
- login page and register page in authentication page(url: '/auth')
- user profile page
- create meeting page
- join meeting page
- meeting page
- history page

## backend routes are called in context folder
- using axios to call backend routes
- axios is used inside a function defination
- fucntions definations recives data from client sends the data to backend routes and return msg to client
- functions are called in the pages where they are required that gives the data to function and returns msg

### handleRegister 
- recives data from client (username, name, password)
- sends data to backend routes (register route) at '/register'
- returns msg to client (success or error)
### handleLogin 
- recives data from client (username, password)
- sends data to backend routes (login route) at '/login'
- returns msg and token to client (success or error)
- stores the token in local storage

### landing page (Home page)
1. bg and button like guest , register, login

### authentication page (login and register page)
1. left bg, right form of login and register with fields (username, name, password)
2. uses handleRegister and handleLogin functions to register and login

### VideoMeet (imp)
1. use STUN server to get local ip address
2. 