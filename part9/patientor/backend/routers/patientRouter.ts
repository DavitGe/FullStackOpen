import { Gender, Patient, Entry } from "../types";

const uuid = require("uuid").v1;
const express = require("express");
const patientRouter = express.Router();

const patientData: Patient[] = require("../db/patients.json");

const getNonSensitiveData = () => {
  return patientData.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
      ssn: patient.ssn,
    };
  });
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string
) => {
  const newPatient = {
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
    entries: [],
    id: uuid(),
  };

  patientData.push(newPatient);
  return newPatient;
};

patientRouter.get("/", (_req, res) => {
  res.json(getNonSensitiveData());
});

patientRouter.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newPatient = addPatient(name, dateOfBirth, gender, occupation, ssn);
    res.json(newPatient);
    res.status(201).end();
  } catch {
    console.error("Invalid arguments");
    res.status(400).end();
  }
});

patientRouter.get("/:id", (req, res) => {
  const person = getNonSensitiveData().find(
    (person) => person.id === req.params.id
  );
  res.json(person);
});

patientRouter.post("/:id/entries", (req, res) => {
  let person = getNonSensitiveData().find(
    (person) => person.id === req.params.id
  );
  console.log("person", person);
  if (person) {
    try {
      const entry: Entry = req.body;
      person.entries = [...person.entries, entry];
      res.json(entry);
    } catch {
      res.status(400).end();
    }
  }
  res.status(404).end();
});

export { patientRouter };
