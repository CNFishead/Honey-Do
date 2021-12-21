import {
  ADD_TODO,
  DELETE_TODO,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TODO,
  FILTER_TODOS,
  CLEAR_FILTER,
  TODO_ERROR,
  GET_TODOS,
  CLEAR_TODOS,
} from "../constants/todoConstants";

// eslint-disable-next-line
export const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        //  spread original state, and than add to the todos array,
        // the previous todos, and then the new todo coming from
        // the payload (action.payload)
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case DELETE_TODO:
      // Return all todos that are not the action.payload (id)
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        loading: false,
      };
    case CLEAR_TODOS:
      return {
        ...state,
        todos: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      // Set current contact
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      // Clear current value
      return {
        ...state,
        current: null,
      };
    case UPDATE_TODO:
      return {
        ...state,
        // This maps over all the todos, checks for the one that is
        // the updated contact, changes that todo, returns all others.
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
        loading: false,
      };
    case FILTER_TODOS:
      return {
        ...state,
        filtered: state.contacts.filter((todo) => {
          // will return anything that matches the name or email
          const regex = new RegExp(`${action.payload}`, "gi");
          return todo.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      // Clear current value
      return {
        ...state,
        filter: null,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
