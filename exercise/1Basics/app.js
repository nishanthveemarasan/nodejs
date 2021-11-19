const http = require("http");
const routes = require('./routes');
const server = http.createServer(routes.handler); //this will run for every request

server.listen(3000); //keep this eunning for incoming request(port , hostname)
