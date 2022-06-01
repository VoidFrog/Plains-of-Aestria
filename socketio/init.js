const { io } = require("../index.js");

io.on("connection", (socket) => {
  console.log(`user connected on socket: ${socket.id}`);
});
