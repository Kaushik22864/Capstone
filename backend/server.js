const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

console.log(process.env.MONGO_URI);

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/api/specialists",
  require("./routes/specialistRoutes")
);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//a