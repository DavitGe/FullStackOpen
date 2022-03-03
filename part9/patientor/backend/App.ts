import express from "express";
const logger = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(logger("dev"));
const patientRouter = require("./routers/patientRouter").patientRouter;
const diagnoseRouter = require("./routers/diagnoseRouter").diagnoseRouter;

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.get("/api/ping", (_req, res) => {
  res.json("Pong");
});

module.exports = app;
