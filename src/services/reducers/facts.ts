import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFact } from "../../utils/types";

export interface TFactsListState {
  fact: TFact;
  request: boolean;
  requestFailed: boolean;
}

export const initialState: TFactsListState = {
  fact: { fact: "", lenght: 0 },
  request: false,
  requestFailed: false,
};

const factsSlice = createSlice({
  name: "facts",
  initialState,
  reducers: {
    getFactRequest(state: TFactsListState) {
      state.request = true;
      state.requestFailed = false;
    },
    getFactSuccess(state: TFactsListState, action: PayloadAction<TFact>) {
      state.fact = action.payload;
      state.request = false;
      state.requestFailed = false;
    },
    requestFailed(state: TFactsListState) {
      state.request = false;
      state.requestFailed = true;
    },
  },
});
export const { getFactRequest, getFactSuccess, requestFailed } =
  factsSlice.actions;

export default factsSlice.reducer;
