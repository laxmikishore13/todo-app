import { Box, TextField, Container, Grid, Button } from "@mui/material";
import List from "./List";
import { useState } from "react";

function Todo() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleTask = (taskId) => {
    setTasks((prevTask) =>
      prevTask.map((task, index) => {
        if (index === taskId) {
          return {
            ...task,
            isDisabled: false,
          };
        }
        return task;
      })
    );
  };
  return (
    <Box sx={{ m: 20 }}>
      <Container component="main" maxWidth="md">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              value={text}
              fullWidth
              label="What do you need to do?"
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ marginLeft: 4 }}
              onClick={() => {
                const obj = {
                  taks: text,
                  isDisabled: true,
                };
                setTasks((prev) => [...prev, obj]);
                setText("");
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {<List tasks={tasks} handleTask={(id) => handleTask(id)} />}
      </Container>
    </Box>
  );
}

export default Todo;
