import { combineReducers } from "redux";
import factsSlice from "./facts";
import ageSlice from "./age";

export const rootReducer = combineReducers({
  facts: factsSlice,
  age: ageSlice,
});
