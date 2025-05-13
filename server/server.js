require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (or specify your frontend URL)
    methods: ["GET", "POST"],
  },
});



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Import routes
const studentRoutes = require("./routes/student");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacher");

// Use the routes
app.use("/api", studentRoutes);
app.use("/api", teacherRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Student API is serving");
});

//const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (data) => {
    console.log("Received message:", data);
    io.emit("receiveMessage", data); // all users ke pathabo
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
