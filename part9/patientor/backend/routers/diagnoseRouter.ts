const express = require("express");
const diagnoseRouter = express.Router();

const diagnoseData = require("../db/diagnoses.json");

const getNonSensitiveEntries = () => {
  return diagnoseData.map((diagnose) => {
    return {
      code: diagnose.code,
      name: diagnose.name,
    };
  });
};

diagnoseRouter.get("/", (_req, res) => {
  res.json(getNonSensitiveEntries());
});

diagnoseRouter.post("/", (_req, res) => {
  res.send("Add patient");
});

export { diagnoseRouter };
