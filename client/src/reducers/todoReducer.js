import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  DELETE_TODO_REQUEST,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_TODOS,
  CLEAR_FILTER,
  CLEAR_TODOS,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
} from "../constants/todoConstants";

// eslint-disable-next-line
export const todoListReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return { loading: true };
    case GET_TODOS_SUCCESS:
      return { loading: false, todos: action.payload.todos };
    case GET_TODOS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return {
        //  spread original state, and than add to the todos array,
        // the previous todos, and then the new todo coming from
        // the payload (action.payload)
        ...state,
        todo: action.payload,
        loading: false,
      };
    case ADD_TODO_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TODO_REQUEST:
      return { loading: true };
    case DELETE_TODO_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TODO_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const todoSetReducer = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_TODOS:
      return {
        current: null,
      };
    case SET_CURRENT:
      // Set current contact
      return {
        current: action.payload,
      };
    case CLEAR_CURRENT:
      // Clear current value
      return {
        current: null,
      };
    default:
      return state;
  }
};
export const todoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TODO_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        loading: false,
        todo: action.payload,
      };
    case UPDATE_TODO_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const todoFilterReducer = (state = {}, action) => {
  switch (action.type) {
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
  }
};
