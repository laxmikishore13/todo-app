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
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOpen";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const signup = async (
    firstname: any,
    lastname: any,
    email: any,
    password: any
  ) => {
    const obj = {
      username: `${firstname} ${lastname}`,
      email,
      password,
    };
    const signupRequest = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    const signupResponse = await signupRequest.json();
    console.log(signupResponse);
    try {
      if (
        signupResponse.message === "User already exists" ||
        signupResponse.message === "Invalid username or password"
      ) {
        setError(true);
      } else {
        navigate("/signin")
      }
    } catch (err) {
      const errorMessage = err.message;
      console.error(errorMessage);
    }
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 11,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#9c27b0" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            sx={{
              marginTop: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  onChange={(e) => setLastname(e.target.value)}
                  label="Last Name"
                  value={lastname}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  value={password}
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates
            via email."
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => signup(firstname, lastname, email, password)}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <NavLink to="/signin" style={{ color: "#1976d2" }}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
          <Alert severity="error" sx={{ mt: 2 }}>
            Invalid details or user already exists
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Signup;
