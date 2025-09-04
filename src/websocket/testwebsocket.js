import React, { useEffect } from "react";
import { io } from "socket.io-client";

const TestWebSocket = () => {
  useEffect(() => {
    const socket = io("http://localhost:4000");

    const engine = socket.io.engine;

    // Check initial transport
    console.log("🚀 Initial transport:", engine.transport.name);

    engine.on("upgrade", (transport) => {
      console.log("⚡ Transport upgraded to:", transport.name); // usually "websocket"
    });

    // Engine-level events
    engine.on("packet", ({ type, data }) => {
      console.log("📩 Engine received packet:", type, data);
    });

    engine.on("packetCreate", ({ type, data }) => {
      console.log("📤 Engine sent packet:", type, data);
    });

    engine.on("drain", () => {
      console.log("✅ Engine write buffer drained");
    });

    // ✅ Socket-level events
    socket.on("connect", () => {
      console.log(`✅ Connected to server with id: ${socket.id}`);
      socket.emit("hello", "world", "kunal");
      socket.emit("tiu", "kolkata");
    });

    socket.on("message", (msg) => {
      console.log(`📩 Message from server: ${msg}`);
    });

    // ❌ Error handling
    socket.on("connect_error", (error) => {
      if (socket.active) {
        console.log("⚠️ Temporary connection issue, retrying...");
      } else {
        console.log("❌ Connection denied:", error.message);
        // socket.connect(); // manually retry if needed
      }
    });
  }, []);

  return <div>🚀 WebSocket Test Running (check console)</div>;
};

export default TestWebSocket;
