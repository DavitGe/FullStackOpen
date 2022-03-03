import express from "express";

const BMIRouter = express.Router();

const calculateBMI = (height: number, weight: number): string => {
  const BMI = weight / ((height * height) / 10000);

  let result;

  if (BMI < 16) {
    result = "Underweight (Severe thinness)";
  } else if (BMI < 16.9) {
    result = "Underweight (Moderate thinness)";
  } else if (BMI < 18.4) {
    result = "Underweight (Mild thinness)";
  } else if (BMI < 24.9) {
    result = "Normal rage";
  } else if (BMI < 29.9) {
    result = "Overweight (Pre-obese)";
  } else if (BMI < 34.9) {
    result = "Obese (Class I)";
  } else if (BMI < 39.9) {
    result = "Obese (Class II)";
  } else {
    result = "Obese (Class III)";
  }

  return result;
};

BMIRouter.get("", (req, res) => {
  console.log("req.query", req.query);
  const BMI = calculateBMI(Number(req.query.height), Number(req.query.weight));
  res.send(BMI);
});

// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);

// calculateBMI(height, weight);
export default BMIRouter;
