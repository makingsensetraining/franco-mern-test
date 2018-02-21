import { users, user, savingUser, userToDelete } from "./userReducer";
import { combineReducers } from "redux";
import { modal } from "./modalReducer";
import { alert } from "./alertReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  modal,
  alert,
  users,
  user,
  savingUser,
  userToDelete,
  auth
});

export default rootReducer;
