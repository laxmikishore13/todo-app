import { Box, TextField, Container, Grid, Button } from "@mui/material";
import List from "./List";
import { useEffect, useState } from "react";

function Todo() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  // Get Todo's --READ
  const fetchTods = async () => {
    const fetchRequest = await fetch("http://localhost:3000/todos", {
      method: "GET",
    });
    const response = await fetchRequest.json();
    setTasks(response);
  };

  useEffect(() => {
    fetchTods();
  }, []);

  // to enable edit mode
  const handleTask = (taskId, description) => {
    setTasks((prevTask) =>
      prevTask.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isEditable: true,
            description: description,
          };
        }
        return task;
      })
    );
    console.log(tasks);
  };

  // create Operation --CREATE
  const createTask = async (obj) => {
    const create = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await create.json();
    setTasks((prev) => [...prev, response]);
    setText("");
  };

  //delete Operation --DELETE
  const deleteTask = async (id) => {
    const deleteRequest = await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
    });
    const deleteResponse = await deleteRequest.text();
    try {
      if (deleteResponse === "OK") {
        fetchTods();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // update Operation --PUT
  const updateTodo = async (taskId) => {
    const taskToUpdate = tasks
      .filter((task) => task.id === taskId)
      .map((item) => {
        return {
          ...item,
          isEditable: false,
        };
      })[0];
    console.log(taskToUpdate);
    const updateRequest = await fetch("http://localhost:3000/todos/" + taskId, {
      method: "PUT",
      body: JSON.stringify(taskToUpdate),
      headers: {
        "content-type": "application/json",
      },
    });
    const updateResponse = await updateRequest.json();
    try {
      if (updateResponse) {
        fetchTods();
      }
    } catch (e) {
      console.log(e);
    }
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
                  title: "test",
                  description: text,
                  isEditable: false,
                  completed: false,
                };
                createTask(obj);
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {
          <List
            tasks={tasks}
            handleTask={(id, description) => handleTask(id, description)}
            deleteRequest={(id) => deleteTask(id)}
            updateRequest={(id, description) => updateTodo(id, description)}
          />
        }
      </Container>
    </Box>
  );
}

export default Todo;
