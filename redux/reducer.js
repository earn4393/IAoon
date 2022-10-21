import { combineReducers } from "redux";
import watchReducer from "./slice/watchSlice";
const rootReducer = combineReducers({
  watch: watchReducer,
});

export default rootReducer;
