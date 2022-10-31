import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   id: "1",
  //   email: "Aaaaa@ku.th",
  //   username: "earn",
  //   firstName: "Kan",
  //   lastName: "Pin",
  //   sex: "female",
  //   img: "https://i.ibb.co/y4n8n20/user.jpg",
  //   password: "123",
  // },
];

let lastId = initialState.length;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      console.log("addUser actived payload");
      state.push({
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        sex: action.payload.sex,
        img: action.payload.img,
      }); //proxy state
    },
    updateIMGUser(state, action) {
      console.log(`updateIMGUser activated payload = ${action.payload}`);
      state.map((item) => {
        if (item.id === action.payload.id) {
          return (item.img = action.payload.img);
        }
      });
    },
    updateUser(state, action) {
      console.log(`updateUser activated payload = ${action.payload}`);
      state.map((item) => {
        if (item.id === action.payload.id) {
          return (
            (item.username = action.payload.username),
            (item.firstName = action.payload.firstName),
            (item.lastName = action.payload.lastName),
            (item.sex = action.payload.sex)
          );
        }
      });
    },
    deleteUser(state, action) {
      console.log(`deleteUser activated payload = ${action.payload.id}`);
      // return state.filter((item)=>item.id !== action.payload)
      return [];
    },
  },
});

console.log(userSlice);
const { actions, reducer } = userSlice;
export const { addUser, updateIMGUser, updateUser, deleteUser } = actions;
export default reducer;
