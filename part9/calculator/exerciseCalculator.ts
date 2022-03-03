import express from "express";

const exerciseRouter = express.Router();

interface exerciseResultSchema {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  avarage: number;
}

const exerciseCalculator = (schedule: number[], target: number): object => {
  const avarage = schedule.reduce((x, y) => x + y, 0) / schedule.length;
  let rating: number;
  let description: string;

  if (avarage >= target) {
    rating = 3;
    description = "Work was done perfectly";
  } else if (avarage > target / 2) {
    rating = 2;
    description = "not too bad but could be better";
  } else {
    rating = 1;
    description = "try harder next time!";
  }

  const result: exerciseResultSchema = {
    periodLength: schedule.length,
    trainingDays: schedule.filter((x) => x !== 0).length,
    success: avarage >= target,
    rating: rating,
    ratingDescription: description,
    target: target,
    avarage: avarage,
  };

  console.log(result);
  return result;
};

exerciseRouter.post("/", (req, res) => {
  try {
    const body = req.body;
    const result = exerciseCalculator(body.schedule, body.target);
    res.send(JSON.stringify(result));
  } catch {
    res.send("parameters are missing");
  }
});

// const target = Number(process.argv[2]);
// // const schedule = JSON.parse(process.argv[2])
// let i = 3;
// let schedule: number[] = [];

// while (process.argv[i]) {
//   if (schedule !== []) {
//     schedule.push(Number(process.argv[i]));
//   } else {
//     schedule = [Number(process.argv[i])];
//   }
//   i += 1;
// }

//exerciseCalculator(schedule, target);

export default exerciseRouter;
