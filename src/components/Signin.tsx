import LockOutlinedIcon from "@mui/icons-material/LockOpen";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Signin() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const signin = async (
    email: any,
    password: any
  ) => {
    const obj = {
      email,
      password,
    };
    const signinRequest = await fetch("http://localhost:3000/signin", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    const signinResponse = await signinRequest.json();
    console.log(signinResponse);
    try {
      if (
        signinResponse.message === "Invalid email or password" ||
        signinResponse.message === "Invalid credentials"
      ) {
        setError(true);
      } else {
        navigate("/todos")
      }
    } catch (err) {
      const errorMessage = err.message;
      console.error(errorMessage);
    }
  };

  return (
    <>
      <Box>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 11,
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ backgroundColor: "#9c27b0", m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1">
              Sign in
            </Typography>
            <Box sx={{ marginTop: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                sx={{ marginTop: 4, marginBottom: 2 }}
                onClick={() => signin(email, password)}
              >
                SIGN IN
              </Button>
              <Grid container justifyContent="space-between">
                <Link href="#" variant="body2">Forgot password?</Link>
                <NavLink to="/signup" style={{color:"#1976d2"}}>Don't have an account? Sign Up</NavLink>
              </Grid>
            </Box>
          </Box>
          <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
          <Alert severity="error" sx={{ mt: 2 }}>
            Invalid details or user doesn't exists
          </Alert>
        </Snackbar>
        </Container>
      </Box>
    </>
  );
}

export default Signin;
