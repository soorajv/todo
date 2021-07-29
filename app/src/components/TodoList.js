import React, { useContext } from 'react';
import axios from 'axios';
import TodosContext from '../context';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);

  return Object.entries(state.todos).map(([id, todo]) => {
    return (
      <div className='container'>
        <ul className=' p-1'>
          <li key={todo.id}>
            {todo.text}

            <input
              name='updateDone'
              className='p-1 m-3'
              type='checkbox'
              checked={todo.done}
              onChange={async () => {
                try {
                  await axios.put(
                    `${process.env.REACT_APP_TO_DO_URL}/${todo.id}`,
                    {
                      done: !todo.done,
                    }
                  );

                  dispatch({
                    type: 'UPDATE_TODO',
                    payload: todo,
                  });
                } catch (error) {}
              }}
            />

            <button
              className='m-2 '
              onClick={async () => {
                try {
                  await axios.delete(
                    `${process.env.REACT_APP_TO_DO_URL}/${todo.id}`
                  );
                  dispatch({ type: 'REMOVE_TODO', payload: todo });
                } catch (error) {}
              }}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    );
  });
}
