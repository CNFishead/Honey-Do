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
} from "../constants/todoConstants";
import { logout } from "./userActions";
import axios from "axios";

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
    dispatch({
      type: GET_TODOS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const listTodoDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: TODO_DETAILS_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/todo/${id}`, config);

//     dispatch({
//       type: TODO_DETAILS_SUCCESS,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: TODO_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

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
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ADD_TODO_ERROR,
        payload: message,
      });
    }
  };

// export const updateTodo = (todo) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: TODO_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(`/api/todo/${todo._id}`, todo, config);

//     dispatch({
//       type: TODO_UPDATE_SUCCESS,
//       payload: data,
//     });
//     dispatch({ type: TODO_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: TODO_UPDATE_FAIL,
//       payload: message,
//     });
//   }
// };
