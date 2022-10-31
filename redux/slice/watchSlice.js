import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
// const initialState = [
//   {
//     id: "1",
//     name: "สิ่งเล็กๆที่เรียกว่ารัก",
//     review:
//       "สิ่งเล็กๆที่เรียกว่ารักaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//     type: "movies",
//     conutry: "India",
//     category: ["comady", "drama"],
//     love: ["Earn", "Donut"],
//     img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
//     trailer: "https://youtu.be/wh874FuQbK4",
//   },
//   {
//     id: "2",
//     name: "lord of the ring",
//     review: "lord of the ring bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
//     type: "movies",
//     conutry: "Chaina",
//     category: ["fantacy", "drama"],
//     love: ["Donut"],
//     img: "https://i.ibb.co/bFH0XSc/ShoesVeg.jpg",
//     trailer: "https://youtu.be/NsWd15iLDHs",
//   },
//   {
//     id: "3",
//     name: "สควิดเกม เล่นลุ้นตาย",
//     review: "สควิดเกม เล่นลุ้นตาย ccccccccccccccccccccccccccccccccccccccc",
//     type: "series",
//     conutry: "Japan",
//     category: ["fantacy", "drama"],
//     love: ["Earn"],
//     img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//     trailer: "https://youtu.be/EGlLMGUCUos",
//   },
//   {
//     id: "4",
//     name: "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ",
//     review:
//       "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ  bbbbbbbbbbbbbbbhyttttttttttttttttttttttttt",
//     type: "series",
//     conutry: "Chaina",
//     category: ["drama", "comady"],
//     love: ["Eart"],
//     img: "https://media.istockphoto.com/photos/sunrise-with-grand-palace-of-bangkok-thailand-picture-id984661764?k=20&m=984661764&s=612x612&w=0&h=OIA4EqyuoUcy-K04raK-8NHAgDTI3XrmmR7ZUmNiPu4=",
//     trailer: "https://youtu.be/URXsfEqxXwo",
//   },
// ];

let lastId = initialState.length;
const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    addWatch(state, action) {
      console.log("addTodo actived payload");
      state.push(action.payload); //proxy state
    },
    updateWatch(state, action) {
      console.log("updateTodo actived payload");
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.love.push(action.payload.username);
        }
      });
    },
    deleteWatch(state, action) {
      console.log("deleteTodo actived payload");
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.love = item.love.filter(
            (username) => username != action.payload.username
          );
        }
      });
    },
  },
});

console.log(watchSlice);
const { actions, reducer } = watchSlice;
export const { addWatch, updateWatch, deleteWatch } = actions;
export default reducer;
