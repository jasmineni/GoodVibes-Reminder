import React, { useState } from "react";
import addbutton from '../images/addbutton.png';
import '../App.css';

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
  
      <button className="center" >
      <img src={addbutton}  alt="Add" />
      </button>
    </form>
  );
}

export default Form;
