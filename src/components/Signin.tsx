import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function Signin() {
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
              <LockOpenIcon />
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
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Password"
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
              >
                SIGN IN
              </Button>
              <Grid container justifyContent="space-between">
                <Link href="#" variant="body2">Forgot password?</Link>
                <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Signin;
