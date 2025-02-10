const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();
const connection = require("./connection/ConnectDB");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");

const port = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

connection()
  .then(() => {
    console.log("Your database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRouter);
app.use("/api", eventRouter);

app.listen(port, () => {
  console.log("You have created server successfully");
});
