import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "สิ่งเล็กๆที่เรียกว่ารัก",
    review:
      "สิ่งเล็กๆที่เรียกว่ารักaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "movie",
    conutry: "India",
    category: ["comady", "drama"],
    love: ["Earn", "Donut"],
  },
  {
    id: "2",
    name: "lord of the ring",
    review: "lord of the ring bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    type: "movie",
    conutry: "Paris",
    category: ["fantacy", "drama"],
    love: ["Donut"],
  },
  {
    id: "3",
    name: "สควิดเกม เล่นลุ้นตาย",
    review: "สควิดเกม เล่นลุ้นตาย ccccccccccccccccccccccccccccccccccccccc",
    type: "serie",
    conutry: "Japan",
    category: ["fantacy", "drama"],
    love: ["Earn"],
  },
  {
    id: "3",
    name: "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ",
    review:
      "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ  bbbbbbbbbbbbbbbhyttttttttttttttttttttttttt",
    type: "serie",
    conutry: "India",
    category: ["drama", "comady"],
    love: ["Eart"],
  },
];

let lastId = initialState.length;
const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    addWatch(state, action) {
      console.log("addTodo actived payload");
      state.push({
        id: lastId,
        name: action.payload.name,
        review: action.payload.review,
        type: action.payload.type,
        conutry: action.payload.conutry,
        category: action.payload.category,
        love: action.payload.love,
      }); //proxy state
    },
    updateWatch(state, action) {
      console.log("updateTodo actived payload");
      state.map((item) => {
        if (item.id === action.payload.id) {
          return (item.love = action.payload.love);
        }
      });
    },
  },
});

console.log(watchSlice);
const { actions, reducer } = watchSlice;
export const { addWatch, updateWatch } = actions;
export default reducer;
