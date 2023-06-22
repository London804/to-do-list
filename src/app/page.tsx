"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useEffect, useState } from 'react';
import './styles/toDo.scss';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(null); 
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
       const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const completeToDo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return updatedTodos;
    });
  }

  const updateTodo = (id) => {
    if (editValue.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              text: editValue,
            };
          }
          return todo;
        });
        return updatedTodos;
      });
    }
    setEditMode(null);
    setEditValue('');
  };

  const handleAddTodoKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const getTodosFromSessionStorage = () => {
    const todosJSON = sessionStorage.getItem('todos');
    return JSON.parse(todosJSON) || [];
  };

  useEffect(() => {
    const storedTodos = getTodosFromSessionStorage();
    setTodos(storedTodos);
  }, []);


  useEffect(() => {
    const todosJSON = JSON.stringify(todos);
    sessionStorage.setItem('todos', todosJSON);
  }, [todos]);

  return (
    <main className="container">

        <div className="header">
          <h2>Simple To-do-list</h2>
        </div>
        <div className='u-flex u-justifyBetween'>
          <input
            className='text-input'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a task..."
            onKeyDown={handleAddTodoKeyDown}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className='toDo-list'>
          <li className='toDo-list__header'>
            <p className='t-bold'>What would you like to do today?</p>
          </li>
          {todos && todos.map((todo, index) => (
            <li 
              className='toDo-list__task'
              key={todo.id}>
              {editMode === todo.id ? (
                <input
                  type="text"
                  className='text-input text-input--small'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => updateTodo(todo.id)}
                  autoFocus
                />
              ) : (
                <div>
                  <p className={todo.completed ? 'toDo--completed' : 'toDo'}>{todo.text}</p>
                </div>
              )}
              <div className='u-flex'>
                <button className='button' onClick={() => completeToDo(todo.id)}>{todo.completed ? 'Undo' : 'Done'}</button>
                <button className='button' onClick={() => deleteTodo(index)}>Delete</button>
                <button className='button' onClick={() => setEditMode(todo.id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>


    </main>
  )
}
