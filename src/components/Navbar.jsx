import { AppBar, Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavBars() {
  return (
    <>
      <AppBar sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h5" component="h1">
            <NavLink
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Tick Tick
            </NavLink>
          </Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <NavLink to="/signup">
              <Button variant="contained" color="inherit">
                SignUp
              </Button>
            </NavLink>
            <NavLink to="/signin">
              <Button variant="contained" color="inherit">
                SignIn
              </Button>
            </NavLink>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}

export default NavBars;
