import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./components/Task";
import Form from "./components/Form";
import React from "react";

function App() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = React.useState({
    name: "",
    description: "",
    isFinished: false,
  });
  const [submit, setSubmit] = React.useState(true);
  const [id, setId] = React.useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/todo/get")
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, [data]);
  function addHandler(e) {
    const { name, value } = e.target;
    setTodo((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function checkBoxHandler(e) {
    setTodo((prevData) => {
      const value = !prevData.isFinished;
      return {
        ...prevData,
        isFinished: value,
      };
    });
  }

  async function submitHandler(e) {
    if (submit) {
      e.preventDefault();
      console.log("submitting a new task");
      const result = await axios.post(
        "http://localhost:3001/api/todo/create",
        todo
      );
      console.log(result);
    } else {
      console.log("updating a new task");
      const result = await axios.put(
        `http://localhost:3001/api/todo/edit/${id}`,
        todo
      );
      console.log(result);
    }

    setTodo({
      name: "",
      description: "",
      isFinished: false,
    });
    setSubmit(true);
  }
  async function deleteHandler(e) {
    const element = e.target.getAttribute("data-index");
    const response = await axios.delete(
      `http://localhost:3001/api/todo/delete/${element}`
    );
    console.log(response);
  }

  async function editHandler(e) {
    setSubmit(false);
    const element = e.target.getAttribute("data-index");
    const { data } = await axios.get(
      `http://localhost:3001/api/todo/get/${element}`
    );
    setId(element);
    setTodo({
      name: data.name,
      description: data.description,
      isFinished: data.isFinished,
    });
  }

  const formHandlers = {
    todo,
    setTodo,
    addHandler,
    checkBoxHandler,
    submitHandler,
  };
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <p>Your Day to Day planner</p>
      <Form props={formHandlers} />
      <Task
        props={data}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
}

export default App;
