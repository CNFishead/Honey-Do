import {
  ADD_TODO_ERROR,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  CLEAR_CURRENT,
  DELETE_TODO_ERROR,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  GET_TODOS_ERROR,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  SET_CURRENT,
  UPDATE_TODO_ERROR,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
} from "../constants/todoConstants";
import { logout } from "./userActions";
import axios from "axios";
import ReactGa from "react-ga";
import { setAlert } from "./alert";

// Set Current List
export const setCurrent = (list) => async (dispatch, getState) => {
  console.log("setcurrent");
  dispatch({ type: SET_CURRENT, payload: list });
};

export const listTodos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TODOS_REQUEST });
    // Pull user information
    const {
      userLogin: { userInfo },
    } = getState();
    // headers and auth
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // axios call
    const { data } = await axios.get(`/api/todo`, config);

    // Dispatch request type
    dispatch({ type: GET_TODOS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
    dispatch({
      type: GET_TODOS_ERROR,
      payload: message,
    });
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_TODO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/todo/${id}`, config);

    dispatch({
      type: DELETE_TODO_SUCCESS,
    });
    dispatch({ type: CLEAR_CURRENT });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "danger"));
    dispatch({
      type: DELETE_TODO_ERROR,
      payload: message,
    });
  }
};

export const createTodo =
  ({ name }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_TODO_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/todo`,
        {
          name,
        },
        config
      );

      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SET_CURRENT,
        payload: data.list,
      });
      ReactGa.event({ category: "List", action: "List was Created" });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setAlert(message, "danger"));
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ADD_TODO_ERROR,
        payload: message,
      });
    }
  };

export const updateTodo = (todo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TODO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/todo/${todo._id}`, todo, config);

    dispatch({
      type: UPDATE_TODO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(message, "danger"));
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: UPDATE_TODO_ERROR,
      payload: message,
    });
  }
};
