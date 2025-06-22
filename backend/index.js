require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionModel } = require("./model/PositionsModel");
const authRouter = require("./routes/auth");
const {OrdersModel} = require("./model/OrdersModel");
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/auth",authRouter);

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionModel.find({});
  res.json(allPositions);
});

app.listen(PORT, () => {
  console.log("App started");
  mongoose.connect(url);
  console.log("DB connected");
});
