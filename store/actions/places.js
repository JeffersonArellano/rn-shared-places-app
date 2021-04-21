import { ADD_PLACE } from "./actionNames";
import { useDispatch } from "react-redux";

export const addPlace = (title, description) => {
  return {
    type: ADD_PLACE,
    payload: { title, description },
  };
};
