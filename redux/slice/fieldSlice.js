import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    country: ["อเมริกา", "ไทย", "เกาหลี"],
    type: ["ภาพยนตร์", "ซีรี่ย์"],
    category: ["fantacy", "romantic", "comady", "drama"],
  },
];

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addField(state, action) {
      console.log("addField actived payload");
      state.push({
        id: 1,
        type: action.payload.type,
        conutry: action.payload.conutry,
        category: action.payload.category,
      }); //proxy state
    },
  },
});

console.log(fieldSlice);
const { actions, reducer } = fieldSlice;
export const { addField } = actions;
export default reducer;
