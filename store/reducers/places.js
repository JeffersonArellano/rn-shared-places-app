import { ADD_PLACE } from "../actions/actionNames";
import Place from "../../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.payload.title,
        action.payload.description
      );

      return { places: state.places.concat(newPlace) };

    default:
      return state;
  }
};
