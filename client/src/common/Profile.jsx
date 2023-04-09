import { Box, Typography } from "@mui/material";
import React from "react";
import uprofile from "../assets/ic_user/ic_user.png";

const Profile = ({ children }) => {
  return (
    <>
      <Box
        display="grid"
        alignContent={"center"}
        sx={{
          width: "25vw",
        }}
      >
        <Box
          m={"auto"}
          p={"30px"}
          sx={{
            backgroundColor: "#EFEFEF",
            borderRadius: "50%",
          }}
        >
          <img src={uprofile} alt="user" />
        </Box>
        <Typography m={"auto"} variant={"h4"} color={"#0B3558"} marginTop={"1rem"}>Welcome!</Typography>
        {children}
      </Box>
    </>
  );
};

export default Profile;
