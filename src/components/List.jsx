import { Box, Grid, TextField } from "@mui/material";

function List() {
  let items = [
    { taks: "Complete todo app" },
    { taks: "Complete todo app" },
    { taks: "Complete todo app" },
    { taks: "Complete todo app" },
    { taks: "Complete todo app" },
    { taks: "Complete todo app" },
  ];
  return (
    <>
      <Box sx={{ marginTop: 8 }}>
        <Grid container spacing={2}>
          {items.map((item, index) => {
            return (
              <Grid item xs={12} sm={10} key={index}>
                <TextField fullWidth value={item.taks} key={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default List;
