const http = require("http");
const index = require("./app");

const port = process.env.PORT || 1337;

const server = http.createServer(index);

server.listen(port, () => {
    console.log('live at http://localhost:' + port);
});