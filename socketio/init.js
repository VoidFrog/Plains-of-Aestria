const httpServer = require("http")
const { Server } = require("socket.io")
const SOCKETPORT = process.env.SOCKETPORT || 3001

const {freeRooms, lobbyUsers} = require("./data")

const io = new Server(SOCKETPORT, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

console.log(`Socket.io listening on port ${SOCKETPORT}`)
io.on("connection", (socket) => {
  socket.on("find-opponent", (data) => {
    const userContext = data.context
    const randomRooms = freeRooms.filter(room => !room?.roomName)
    if (randomRooms.length !== 0 && randomRooms[0].userId !== userContext.userId) {
      const enemyContext = randomRooms[0].userContext
      const emitObj = {
        player1Context: userContext,
        player2Context: enemyContext
      }
    
      socket.join(randomRooms[0].roomId)
      io.to(randomRooms[0].roomId).emit("pair-with-opponent", {...emitObj, socketRoom: freeRooms[0].roomId})
      return randomRooms.shift()
    }

    const roomId = Math.random().toString(36).substring(2, 13)
    freeRooms.push({roomId, userId: userContext.userId, userContext})
    socket.join(roomId)
  })

  socket.on("join-lobby", (userData) => {
    socket.join("lobby")
    lobbyUsers.push(userData.userId)
  })

  socket.on("create-room", (data) => {
      const {userContext, roomName} = data
      const roomId = Math.random().toString(36).substring(2, 13)
    freeRooms.push({roomId, userId: userContext.userId, userContext, roomName: roomName})
    socket.join(roomId)
    console.log("public" + freeRooms.filter((room) => !room?.roomName))
    console.log("private" + freeRooms.filter((room) => room?.roomName))
  })
});
