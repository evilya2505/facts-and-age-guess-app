import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAge } from "../../utils/types";

export interface TAgeListState {
  age: TAge | null;
  request: boolean;
  requestFailed: boolean;
}

export const initialState: TAgeListState = {
  age: null,
  request: false,
  requestFailed: false,
};

const ageSlice = createSlice({
  name: "age",
  initialState,
  reducers: {
    getAgeRequest(state: TAgeListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getAgeSuccess(state: TAgeListState, action: PayloadAction<TAge>) {
      state.age = action.payload;
      state.request = false;
      state.requestFailed = false;
    },
    requestFailed(state: TAgeListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const { getAgeRequest, getAgeSuccess, requestFailed } = ageSlice.actions;

export default ageSlice.reducer;
