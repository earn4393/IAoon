import { combineReducers } from "redux";
import watchReducer from "./slice/watchSlice";
import fieldReducer from "./slice/fieldSlice";
import userReducer from "./slice/userSlice";

const rootReducer = combineReducers({
  watch: watchReducer,
  field: fieldReducer,
  user: userReducer,
});

export default rootReducer;
