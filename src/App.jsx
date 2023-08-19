import "./App.css";
import NavBars from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <NavBars />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
