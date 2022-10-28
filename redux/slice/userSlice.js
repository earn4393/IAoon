import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    email: "Aaaaa@ku.th",
    username: "earn",
    firstName: "Kan",
    lastName: "Pin",
    sex: "female",
  },
];

let lastId = initialState.length;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      console.log("addUser actived payload");
      state.push({
        id: lastId,
        email: action.payload.email,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        sex: action.payload.sex,
      }); //proxy state
    },
  },
});

console.log(userSlice);
const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;
