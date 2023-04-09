import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Profile from "../common/Profile";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user,loggedin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(loggedin === false){
      navigate('/login')
    }
  })


  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Profile>
          <Typography textAlign={"center"} variant="h4">{user}</Typography>
        </Profile>
      </Grid>
    </>
  );
};

export default Home;
