"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useState } from 'react';
import './styles/toDo.scss';

export default function Home() {
  const [todos, setTodos] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='w-96'>
        <h1>TODO List</h1>
        <div className='u-flex u-justifyBetween'>
          <input
            className='text-input'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a task..."
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className='w-96'>
          {todos.map((todo, index) => (
            <li className='mt-4 u-flex u-justifyBetween' key={index}>
              {todo}
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      );
      

    </main>
  )
}
