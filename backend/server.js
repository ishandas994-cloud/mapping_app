const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const roomRoutes = require("./routes/roomRoutes");
const edgeRoutes = require("./routes/edgeRoutes");

app.use("/api/rooms", roomRoutes);
app.use("/api/edges", edgeRoutes);

app.get("/", (req, res) => {
    res.send("Mapping Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});