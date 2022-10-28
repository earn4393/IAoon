import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addField(state, action) {
      console.log("addField actived payload");
      let inArray = true;
      state.map((item) => {
        if (item.country == action.payload.country) {
          inArray = false;
        }
      });

      if (inArray) {
        state.push({
          id: action.payload.id,
          country: action.payload.country,
        }); //proxy state
      }
    },
  },
});

console.log(fieldSlice);
const { actions, reducer } = fieldSlice;
export const { addField } = actions;
export default reducer;
