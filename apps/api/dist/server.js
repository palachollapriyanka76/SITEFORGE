import "dotenv/config";
import http from "node:http";
import app from "./app.js";
import { initializeSocket } from "./socket.js";
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
// Initialize Socket.io
initializeSocket(server);
server.listen(PORT, () => {
    console.log(`🚀 SiteForge API running on http://localhost:${PORT}`);
    console.log(`📡 Socket.io server attached`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map