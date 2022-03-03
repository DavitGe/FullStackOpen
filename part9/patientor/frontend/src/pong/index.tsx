import React, { useState } from "react";

import axios from "axios";
import { apiBaseUrl } from "../constants";

const Pong = () => {
  const [response, setResponse] = useState("Loading...");

  const getPong = (): void => {
    const req = axios.get(`${apiBaseUrl}/ping`);
    // eslint-disable-next-line
    req.then((res) => {
      console.log(res.data);
      setResponse(res.data);
    });
  };
  getPong();
  console.log("response", response);
  return <>{response}</>;
};

export default Pong;
