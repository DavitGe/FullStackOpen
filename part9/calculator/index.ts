import express from "express";
import _ from "lodash";

import BMIRouter from "./calculateBMI";
import exerciseRouter from "./exerciseCalculator";

//const express = require("express");
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.use("/bmi", BMIRouter);
app.use("/exercises", exerciseRouter);
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
