import { Server as HttpServer } from "node:http";
import { Server, Socket } from "socket.io";

let io: Server;

export function initializeSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Join a website editing room
    socket.on("website:join", (websiteId: string) => {
      socket.join(`website:${websiteId}`);
      console.log(`📝 ${socket.id} joined website:${websiteId}`);
    });

    // Leave a website editing room
    socket.on("website:leave", (websiteId: string) => {
      socket.leave(`website:${websiteId}`);
      console.log(`👋 ${socket.id} left website:${websiteId}`);
    });

    // Page component updates (real-time collaboration)
    socket.on("page:update", (data: { pageId: string; components: unknown[] }) => {
      // Broadcast to all other clients in the same website room
      const rooms = Array.from(socket.rooms);
      const websiteRoom = rooms.find((r) => r.startsWith("website:"));
      if (websiteRoom) {
        socket.to(websiteRoom).emit("page:updated", data);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initializeSocket first.");
  }
  return io;
}
