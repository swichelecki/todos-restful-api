import React, { useState, useEffect } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo, editTodo }) {

  return(
    <div
      className="todo"
      style={{ textDecoration: todo.isComplete ? "line-through" : "" }}
      >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index, todo._id, todo.text, todo.isComplete)}>Complete</button>
        <button onClick={() => editTodo(index, todo._id, todo.text, todo.isComplete)}>Edit</button>
        <button onClick={() => removeTodo(index, todo._id)}>x</button>
      </div>
    </div>
  )

}

function TodoForm({ addTodo }) {

  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )

}

function EditForm({ editThis, postEdit }) {

  const [value2, setValue2] = useState(editThis);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value2) return;
    postEdit(value2);
    setValue2({text: ""});
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value2.text}
        onChange={e => setValue2({text: e.target.value, id: editThis.id, index: editThis.index, isComplete: editThis.isComplete })}
      />
    </form>
  )

}

function App() {

  const [todos, setTodos] = useState([
    /*{ text: "Learn React",
      isComplete: false
    },
    { text: "Meet friend for lunch",
      isComplete: false
    },
    { text: "Build really cool todo app",
      isComplete: false
    }*/
  ]);

  async function fetchData() {
    const res = await fetch('/todos');
    res
      .json()
      .then(res => setTodos(res))
      .catch(err => res.json({ message: err }));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = text => {
    
    const newTodos = [...todos, { text }];
    setTodos(newTodos);

    fetch('/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    .then((res) => res.json())
    .then((data) => {
      fetchData();
    })

  }

  const completeTodo = (index, id, text, isComplete) => {
    
    (isComplete === false) ? isComplete = true : isComplete = false;
    
    const newTodos = [...todos];
    newTodos[index].isComplete = isComplete;  
    setTodos(newTodos);

    fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 
        isComplete,
        text 
      })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

  }

  const postEdit = (value2) => {
  
    const {text, id, index, isComplete} = value2;

    const newTodos = [...todos];
    newTodos[index].text = text;
    newTodos[index].isComplete = isComplete;
    setTodos(newTodos);
    
    fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 
        text,
        isComplete
      })
    })
    .then((res) => res.json())
    .then((data) => {
      fetchData();
      setIsEditing(false);
    })

  }

  const [isEditing, setIsEditing] = useState(false);
  const [editThis, setEditThis] = useState();
  
  const editTodo = (index, id, text, isComplete) => {

     setIsEditing(true);
     setEditThis({index, id, text, isComplete});

  }

  const removeTodo = (index, id) => {

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

  }

  return(
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        ))}
        { isEditing === true ?
        (<EditForm editThis={editThis} postEdit={postEdit} />)
        :
        (<TodoForm addTodo={addTodo} />)
        }
      </div>
    </div>
  );

}

export default App;
