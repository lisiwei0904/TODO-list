// App.js
import React, { useState, useRef, useEffect } from 'react';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function addTask(name, priority, dueDate, repeat) {
    const newTask = { 
      id: "todo-" + nanoid(), 
      name: name, 
      completed: false, 
      priority: priority,
      dueDate: dueDate,
      repeat: repeat
    };
    setTasks([...tasks, newTask]);
  }

  function addPhotoToTask(id, photo) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, photo };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        priority={task.priority}
        dueDate={task.dueDate}
        repeat={task.repeat}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        addPhotoToTask={addPhotoToTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1">
        {taskList.length !== 1
          ? `${taskList.length} tasks remaining`
          : `${taskList.length} task remaining`}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
