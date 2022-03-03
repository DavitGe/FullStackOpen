import axios from "axios";
import { apiBaseUrl } from "../constants";

export const getPong = () => {
  const req = axios.get(`${apiBaseUrl}/ping`);
  const res = req.then((res) => {
    console.log("im here");
    console.log(res.data); // Here i get response data
    // eslint-disable-next-line
    return res.data;
  });
  console.log("res", res); // here i get promise
  return res;
};
