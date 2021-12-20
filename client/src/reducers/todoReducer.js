import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_RESET,
  TODO_CREATE_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DETAILS_FAIL,
  TODO_DETAILS_REQUEST,
  TODO_DETAILS_SUCCESS,
  TODO_LIST_FAIL,
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_RESET,
  TODO_UPDATE_SUCCESS,
} from "../constants/todoConstants";

export const todoListReducer = (state = { todoLists: [] }, action) => {
  switch (action.type) {
    case TODO_LIST_REQUEST:
      return { loading: true, todoLists: [] };
    case TODO_LIST_SUCCESS:
      return {
        loading: false,
        todos: action.payload.lists,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TODO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const todoDetailsReducer = (state = { todo: {} }, action) => {
  switch (action.type) {
    case TODO_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TODO_DETAILS_SUCCESS:
      return { loading: false, todo: action.payload };
    case TODO_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_DELETE_REQUEST:
      return { loading: true };
    case TODO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TODO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_CREATE_REQUEST:
      return { loading: true };
    case TODO_CREATE_SUCCESS:
      return { loading: false, success: true, todo: action.payload };
    case TODO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TODO_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const todoUpdateReducer = (state = { todo: {} }, action) => {
  switch (action.type) {
    case TODO_UPDATE_REQUEST:
      return { loading: true };
    case TODO_UPDATE_SUCCESS:
      return { loading: false, success: true, todo: action.payload };
    case TODO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TODO_UPDATE_RESET:
      return { todo: {} };
    default:
      return state;
  }
};
