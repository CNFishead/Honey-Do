import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  todoCreateReducer,
  todoDeleteReducer,
  todoDetailsReducer,
  todoListReducer,
  todoUpdateReducer,
} from "./reducers/todoReducer";

const middleware = [thunk];

const reducer = combineReducers({
  // User Reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  // Project Reducers
  getTodos: todoListReducer,
  todoUpdate: todoUpdateReducer,
  todoDelete: todoDeleteReducer,
  todoCreate: todoCreateReducer,
  todoDetails: todoDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const todoInfoFromStorage = localStorage.getItem("todoLists")
  ? JSON.parse(localStorage.getItem("todoLists"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  todos: { todoLists: todoInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
