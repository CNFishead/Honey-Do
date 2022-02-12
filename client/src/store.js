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
  todoListReducer,
  todoSetReducer,
  todoUpdateReducer,
} from "./reducers/todoReducer";
import { alert } from "./reducers/alertReducer";

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
  // Todo Reducers
  todoLists: todoListReducer,
  todoCreate: todoCreateReducer,
  todoSet: todoSetReducer,
  todoDelete: todoDeleteReducer,
  todoUpdate: todoUpdateReducer,
  // Alert reducer
  alert: alert,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const todoInfoFromStorage = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  todoLists: { todos: todoInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
