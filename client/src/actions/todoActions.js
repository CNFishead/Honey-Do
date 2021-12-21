import { GET_TODOS, TODO_ERROR } from "../constants/todoConstants";
import { logout } from "./userActions";
import axios from "axios";

export const listTodos = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // axios call
    const { data } = await axios.get(`/api/todo`, config);
    // on success dispatch request success
    // Dispatch request type
    dispatch({ type: GET_TODOS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
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

// export const deleteTodo = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: TODO_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.delete(`/api/todo/${id}`, config);

//     dispatch({
//       type: TODO_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: TODO_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };

// export const createTodo =
//   ({ name }) =>
//   async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: TODO_CREATE_REQUEST,
//       });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.post(
//         `/api/todo`,
//         {
//           name,
//         },
//         config
//       );

//       dispatch({
//         type: TODO_CREATE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       if (message === "Not authorized, token failed") {
//         dispatch(logout());
//       }
//       dispatch({
//         type: TODO_CREATE_FAIL,
//         payload: message,
//       });
//     }
//   };

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
