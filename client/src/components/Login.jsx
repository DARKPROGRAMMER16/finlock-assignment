import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Profile from "../common/Profile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emr, setEmr] = useState(false);
  const [emrm, setEmrm] = useState("");

  const [pr, setPr] = useState(false);
  const [prm, setPrm] = useState("");

  const { getLoggedin } = useAuth();

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmr(true);
        setEmrm("Enter valid email");
        return;
      } else {
        setEmr(false);
        setEmrm("");
      }

      if (!password) {
        setPr(true);
        setPrm("Enter valid email");
        return;
      } else {
        setPr(false);
        setPrm("");
      }

      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:8080/auth/login", loginData);
      await getLoggedin();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
          <form onSubmit={login}>
            <Box display="grid" gap={2} marginTop={"1rem"}>
              <Typography
                textAlign={"center"}
                color={"#0B3558"}
                variant={"p"}
                m={"auto"}
              >
                Let's connect to your workspace. Please enter your email to
                continue.
              </Typography>
              <TextField
                type={"email"}
                error={emr}
                label="Email"
                helperText={emrm}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type={"password"}
                error={pr}
                label="Password"
                helperText={prm}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography textAlign={"end"} color={"#003FB9"} variant={"p"}>
                Forgot Password?
              </Typography>
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </Box>
          </form>
        </Profile>
      </Grid>
    </>
  );
};

export default Login;
