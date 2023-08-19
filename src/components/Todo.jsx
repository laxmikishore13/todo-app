import { Box, TextField, Container, Grid, Button } from "@mui/material";
import List from "./List";

function Todo() {
  return (
    <Box sx={{ m: 20 }}>
      <Container component="main" maxWidth="md">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="What do you need to do?" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              sx={{ marginLeft: 4 }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {<List />}
      </Container>
    </Box>
  );
}

export default Todo;
