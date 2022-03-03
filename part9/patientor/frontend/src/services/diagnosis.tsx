import axios from "axios";
import { apiBaseUrl } from "../constants";
// import { Diagnosis } from "../types";

export const getDiagnosis = async () => {
  const diagnosis = await axios.get(`${apiBaseUrl}/diagnoses`);
  //eslint-disablse-next-line
  return diagnosis;
};
