import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import TodosContext from '../context';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: {},
    dispatch,
  } = useContext(TodosContext);

  useEffect(() => {
    setTodo('');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_TO_DO_URL, {
        text: todo,
        done: false,
      });
      dispatch({ type: 'ADD_TODO', payload: response.data });
    } catch (error) {}
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center p-5'>
      <div className='container'>
        Create a Todo Item{' '}
        <input
          type='text'
          onChange={(event) => setTodo(event.target.value)}
          value={todo}
        />
        <button className='m-2 ' type='submit'>
          Create
        </button>
      </div>
    </form>
  );
}
