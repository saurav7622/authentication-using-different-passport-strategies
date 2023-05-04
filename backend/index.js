const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

app.use(cookieParser());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB connection successful!");
  });

console.log("hyeeeee");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: "true",
  })
);

app.use("/api/v1/users", userRouter);

app.listen("5000", () => {
  console.log("Server is running!");
});
