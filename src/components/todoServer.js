/* eslint-disable no-undef */
/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

const directoryName = path.join(__dirname, "solutions/todos.json");

const USERS = [];
// const todos = [];

const secretKey = "r!CHMond7&";

const userAuthentication = (req, res) => {
  const token = req.headers["Authorization"];
  jwt.verify(token, secretKey, (err) => {
    if (err) {
      res.status(403).send("Invalid Credentials");
    } else {
      res.status(200).send("User is authorized");
    }
  });
};

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(203).json({ message: "Invalid username or password" });
  }
  const userFound = USERS.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (userFound !== -1) {
    res.status(200).json({ message: "User already exists" });
  } else {
    const token = jwt.sign({ username, password }, secretKey);
    USERS.push(req.body);
    res.status(200).json({ message: "User created successfully", token });
  }
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(203).json({ message: "Invalid email or password" });
  }
  const userFound = USERS.findIndex(
    (user) => user.email === email && user.password === password
  );
  if (userFound !== -1) {
    const token = jwt.sign({ email, password }, secretKey);
    res.status(200).json({ message: "User logged successfully", token });
  } else {
    res.status(200).json({ message: "Invalid credentials" });
  }
});

app.get("/todos", userAuthentication, (req, res) => {
  fs.readFile(directoryName, "utf8", (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(directoryName, "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const todoID = todos.findIndex((todo) => todo.id === id);
    if (todoID === -1) res.status(401).send("Not Found");
    res.status(200).json(todos[todoID]);
  });
});

// app.get("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const todoId = todos.findIndex((r) => r.id === id);
//   if (todoId === -1) res.status(404).send("Not Found");
//   const todo = todos[todoId];
//   res.status(200).json(todo);
// });

// app.put("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const todoId = todos.findIndex((r) => r.id === id);
//   if (todoId === -1) res.status(404).send("Not Found");
//   todos[todoId]["title"] = req.body.title;
//   todos[todoId]["completed"] = req.body.completed;
//   res.status(200).json(todos[todoId]);
// });

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(directoryName, "utf8", (err, data) => {
    const todos = JSON.parse(data);
    const todoID = todos.findIndex((todo) => todo.id === id);
    todos[todoID]["title"] = req.body.title;
    todos[todoID]["completed"] = req.body.completed;
    todos[todoID]["description"] = req.body.description;
    todos[todoID]["isEditable"] = false;
    fs.writeFile(directoryName, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(todos[todoID]);
    });
  });
});

app.post("/todos", (req, res) => {
  const todo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description,
    completed: false,
    isEditable: false,
  };
  fs.readFile(directoryName, "utf8", (err, data) => {
    const todos = JSON.parse(data);
    todos.push(todo);
    fs.writeFile(directoryName, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).json(todo);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(directoryName, "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoID = todos.findIndex((todo) => todo.id === id);
    if (todoID === -1) res.status(404).send("Not Found");
    todos.splice(todoID, 1);
    fs.writeFile(directoryName, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).send("OK");
    });
  });
});

// app.delete("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const todoIndex = todos.findIndex((todd) => todd.id === id);
//   if (todoIndex === -1) res.status(404).send("Not Found");
//   todos.splice(todoIndex, 1);
//   res.status(200).send("OK");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
