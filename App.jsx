import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks || []);
  const [filter, setFilter] = useState("all"); 

  function addTask(name) {
    // Get geolocation information
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        const newTask = {
          id: `todo-${nanoid()}`,
          name,
          completed: false,
          photo: null,
          latitude,
          longitude
        };
  
        setTasks(prevTasks => [...prevTasks, newTask]);
  
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      },
      error => {
        console.error('Error getting geolocation:', error);
  
        const newTask = {
          id: `todo-${nanoid()}`,
          name,
          completed: false,
          photo: null
        };
  
        setTasks(prevTasks => [...prevTasks, newTask]);
  
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
    );
  }
  
  

  function toggleTaskCompleted(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }; 
      }
      return task;
    }));
  }
  
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id) {
    const currentTask = tasks.find(task => task.id === id);
    const newName = prompt("Edit the task", currentTask.name);
    
    if (newName !== null && newName.trim() !== "") {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, name: newName };
        }
        return task;
      }));
    }
  }

  function addPhoto(taskId, photo) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, photo }; 
      }
      return task;
    }));
  }  
  
  const taskList = tasks.filter(task => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "uncompleted") {
      return !task.completed;
    } else {
      return true;
    }
  }).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
      taskPhoto={task.photo}
      addPhoto={addPhoto} 
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton setFilter={setFilter} select="all" name="All" activeFilter={filter} />
        <FilterButton setFilter={setFilter} select="completed" name="Completed" activeFilter={filter} />
        <FilterButton setFilter={setFilter} select="uncompleted" name="Uncompleted" activeFilter={filter} />
      </div>
      <h2 id="list-heading">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
