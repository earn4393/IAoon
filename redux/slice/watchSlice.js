import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "สิ่งเล็กๆที่เรียกว่ารัก",
    review:
      "สิ่งเล็กๆที่เรียกว่ารักaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "movies",
    conutry: "India",
    category: ["comady", "drama"],
    love: ["Earn", "Donut"],
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
  {
    id: "2",
    name: "lord of the ring",
    review: "lord of the ring bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    type: "movies",
    conutry: "Chaina",
    category: ["fantacy", "drama"],
    love: ["Donut"],
    img: "https://i.ibb.co/bFH0XSc/ShoesVeg.jpg",
  },
  {
    id: "3",
    name: "สควิดเกม เล่นลุ้นตาย",
    review: "สควิดเกม เล่นลุ้นตาย ccccccccccccccccccccccccccccccccccccccc",
    type: "series",
    conutry: "Japan",
    category: ["fantacy", "drama"],
    love: ["Earn"],
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
  {
    id: "4",
    name: "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ",
    review:
      "ชีวิตเพื่อชาติ รักนี้เพื่อเธอ  bbbbbbbbbbbbbbbhyttttttttttttttttttttttttt",
    type: "series",
    conutry: "Chaina",
    category: ["drama", "comady"],
    love: ["Eart"],
    img: "https://i.ibb.co/bFH0XSc/ShoesVeg.jpg",
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
