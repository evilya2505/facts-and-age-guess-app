import mainApi from "../../utils/mainApi";
import { getAgeRequest, getAgeSuccess, requestFailed } from "../reducers/age";
import { AppDispatch } from "../store";

export const getAge = (name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getAgeRequest());

    mainApi
      .getAge(name)
      .then((data) => {
        dispatch(getAgeSuccess(data));
      })
      .catch((err) => {
        dispatch(requestFailed());
      });
  };
};
