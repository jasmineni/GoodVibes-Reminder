import { nanoid } from "nanoid"
import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import bearlogo from './images/bear logo.svg';
import './App.css';


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
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

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }  

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  //const headingText = `${taskList.length} ${tasksNoun} remaining`;
  //      <h2 id="list-heading">{headingText} </h2>

  return (
    <div className="todoapp stack-large" style={{ backgroundColor: '#F8F5EECF' }} >
       
      <img src={bearlogo} alt="logo" className="center"></img>
      
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg" style={{ fontFamily: 'Roboto Mono, monospace' }}>
          Good Morning, </label>
        <label style={{width: '100%', color: 'black', fontSize: 32, fontFamily: 'Rubik Mono One', fontWeight: '400', wordWrap: 'break-word'}}>
          JASMINE NI
        </label>
      </h2>
      
    
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>

      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      </div>
      
    </div>
  );
}

export default App;
