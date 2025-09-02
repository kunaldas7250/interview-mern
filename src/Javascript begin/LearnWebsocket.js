// const { createServer } = require("http");
// const { Server } = require("socket.io");

// // Create HTTP server
// const httpServer = createServer();

// // Create Socket.IO server
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000", // React app
//     methods: ["GET", "POST"],
//   },
// });

// // Listen for client connections
// io.on("connection", (socket) => {
//   console.log(`✅ Client connected: ${socket.id}`);

//   // Handle custom "hello" event
//   socket.on("hello", (msg, mssg2) => {
//     console.log(`📩 Hello from client: ${msg} ${mssg2}`);
//     socket.emit("message", `👋 Hi client, I got message: ${msg}, ${mssg2}`);
//   });

//   // Handle second custom event
//   socket.on("tiu", (data) => {
//     console.log(`📩 Got 2nd emit data: ${data}`);
//     socket.emit("message", `👋 Hi client, I got 2nd message: ${data}`);
//   });

//   // ✅ Handle third custom event (user data)
//   socket.on("userDataArray", (dataArray) => {
//   console.log("📥 Received full array from client:", dataArray);

//   // reply back if needed
//   socket.emit("message", `✅ Got your array with ${dataArray[0].firstname} and ${dataArray[0].lastname}  items`);
// });

// socket.on("data", (dataArray) => {
//   if (!Array.isArray(dataArray) || dataArray.length === 0) {
//     console.log("⚠️ No data received");
//     return;
//   }

//   console.log("📥 Received full array:", dataArray);

//   // Send back confirmation with actual count
//   socket.emit("message", `✅ Got ${dataArray.length} items`);
// });


// // Start server
// httpServer.listen(4000, () => {
//   console.log("🚀 WebSocket server running on http://localhost:4000");
// });


const { createServer } = require("http");
const { Server } = require("socket.io");

// Create HTTP server
const httpServer = createServer();

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Handle custom "hello" event
  socket.on("hello", (msg, mssg2) => {
    console.log(`📩 Hello from client: ${msg} ${mssg2}`);
    socket.emit("message", `👋 Hi client, I got message: ${msg}, ${mssg2}`);
  });

  // Handle second custom event
  socket.on("tiu", (data) => {
    console.log(`📩 Got 2nd emit data: ${data}`);
    socket.emit("message", `👋 Hi client, I got 2nd message: ${data}`);
  });

  // ✅ Handle third custom event (user data array)
  socket.on("userDataArray", (dataArray) => {
    console.log("📥 Received full array from client:", dataArray);

    if (Array.isArray(dataArray) && dataArray.length > 0) {
      socket.emit(
        "message",
        `✅ Got your array with first user: ${dataArray[0].firstname} ${dataArray[0].lastname}`
      );
    } else {
      socket.emit("message", "⚠️ Got empty array");
    }
  });

  // ✅ Handle generic data event
  socket.on("data", (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      console.log("⚠️ No data received");
      return;
    }

    console.log("📥 Received full array:", dataArray);

    // Send back confirmation with actual count
    socket.emit("message", `✅ Got ${dataArray.length} items`);
  });
}); // 👈 this was missing!

// Start server
httpServer.listen(4000, () => {
  console.log("🚀 WebSocket server running on http://localhost:4000");
});
