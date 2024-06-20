const express = require("express");
const app = express();
const http = require("http").Server(app);

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// import router
const authRouter = require("./routes/AuthRoute");
const problemRoute = require("./routes/ProblemRoute");
const playgroundRoute = require("./routes/Playground");
dotenv.config();
const PORT = process.env.PORT || 4000;  

database.connect();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//def route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problem", problemRoute);
app.use("/api/v1/playground", playgroundRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
