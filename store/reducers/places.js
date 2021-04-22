import { ADD_PLACE, GET_PLACES } from "../actions/actionNames";
import Place from "../../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES:
      return { places: action.payload };

    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id,
        action.payload.title,
        action.payload.description,
        action.payload.imageUrl,
        action.payload.ownerId,
        action.payload.ownerLink,
        action.payload.date
      );

      return { places: state.places.concat(newPlace) };

    default:
      return state;
  }
};
