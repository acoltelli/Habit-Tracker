import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import habitsReducer from "./habitsReducer";
import daysReducer from "./daysReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  habits: habitsReducer,
  days: daysReducer
});
