import mainApi from "../../utils/mainApi";
import {
  getFactRequest,
  getFactSuccess,
  requestFailed,
} from "../reducers/facts";
import { AppDispatch } from "../store";

export const getFacts = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getFactRequest());

    mainApi
      .getFact()
      .then((data) => {
        dispatch(getFactSuccess(data));
      })
      .catch((err) => {
        dispatch(requestFailed());
      });
  };
};
