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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { NavLink } from "react-router-dom";

function Signup() {
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
            <LockOpenIcon />
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
                <TextField variant="outlined" label="First Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField variant="outlined" label="Last Name" required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  required
                  type="password"
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
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <NavLink to="/signin">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
