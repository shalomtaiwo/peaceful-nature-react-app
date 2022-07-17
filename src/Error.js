import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "./Assets/404.png";


const Error = () => {
  let navigate = useNavigate();
  function shopping() {
    navigate('/shop')
  }
  return (
    <div className="errorPage">
      <img srcSet={errorImage} alt="404 error" width={"100%"} />
      <Button variant="contained" color="success" onClick={shopping}>
        Continue Shopping Here
      </Button>
    </div>
  );
};

export default Error;
