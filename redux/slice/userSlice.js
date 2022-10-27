import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    email: "Aaaaa@ku.th",
    username: "Earn",
    firstName: "Kan",
    lastName: "Pin",
    sex: "female",
    img: "https://i.ibb.co/y4n8n20/user.jpg"
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
        img: action.payload.img,
      }); //proxy state
    },
    updateIMGUser(state, action){
      console.log(`updateIMGUser activated payload = ${action.payload}`);
      state.map((item)=>{
        if(item.id === action.payload.id){
          return item.img = action.payload.img
        }
      })
    },
    updateUser(state, action){
      console.log(`updateUser activated payload = ${action.payload}`);
      state.map((item)=>{
        if(item.id === action.payload.id){
          return (
            item.username = action.payload.username,
            item.firstName = action.payload.firstName,
            item.lastName = action.payload.lastName,
            item.sex = action.payload.sex
          )
        }
      })
    },
  },
});

console.log(userSlice);
const { actions, reducer } = userSlice;
export const { addUser, updateIMGUser } = actions;
export default reducer;
