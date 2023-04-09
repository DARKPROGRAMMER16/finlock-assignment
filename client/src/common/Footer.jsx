import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import logo from "../assets/zaperon_logo/zaperon_logo.png";

const Footer = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems={"end"}
        sx={{ minHeight: "15vh" }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant={"h6"} color={"#728391"}>
              Powered by &nbsp;
            </Typography>

            <img src={logo} alt="" />
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant={"h6"} color={"#003FB9"}>
              Need Help? &nbsp; &nbsp;
            </Typography>
            <Typography variant={"h6"} color={"#003FB9"}>
              Privacy Policy & Terms &nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
