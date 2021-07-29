export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      return { ...state, todos: action.payload };

    case 'UPDATE_TODO':
      state.todos[action.payload.id].done =
        !state.todos[action.payload.id].done;
      return { ...state, todos: state.todos };
    case 'REMOVE_TODO':
      delete state.todos[action.payload.id];

      return { ...state, todos: state.todos };
    default:
      return state;
  }
}
