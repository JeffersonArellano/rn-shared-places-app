import { ADD_PLACE, GET_PLACES } from "./actionNames";
import { useDispatch } from "react-redux";
import Place from "../../models/place";

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://rn-shared-places-app-default-rtdb.firebaseio.com/places.json`
      );

      if (!response) {
        const responseError = await response.json();
        throw new Error(
          `Something went wrong, error with the request. details:[${responseError.message}]`
        );
      }

      const responseData = await response.json();

      const loadedPlaces = [];
      for (var key in responseData) {
        loadedPlaces.push(
          new Place(
            key,
            responseData[key].title,
            responseData[key].description,
            responseData[key].imageUrl,
            responseData[key].ownerId,
            responseData[key].ownerLink,
            responseData[key].date
          )
        );
      }

      dispatch({ type: GET_PLACES, payload: loadedPlaces });
    } catch (error) {
      throw new Error(
        `Something went wrong, fetching the data. details:[${responseError.message}]`
      );
    }
  };
};

export const addPlace = (payload) => {
  const ownerId = "@jarellano";
  const ownerLink = "https://www.linkedin.com/in/jefferson-arellano/";
  const creationDate = new Date().toISOString();

  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://rn-shared-places-app-default-rtdb.firebaseio.com/places.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: payload.title,
            description: payload.description,
            imageUrl: payload.imageUrl,
            ownerId: ownerId,
            ownerLink: ownerLink,
            date: creationDate,
          }),
        }
      );

      if (!response) {
        const responseError = await response.json();
        throw new Error(`Something  went wrong,  ${responseError.message}`);
      }

      const responseData = await response.json();
      const payloadUpdated = {
        id: responseData.name,
        ...payload,
        ownerId: ownerId,
        ownerLink: ownerLink,
        date: creationDate,
      };

      dispatch({
        type: ADD_PLACE,
        payload: payloadUpdated,
      });
    } catch (error) {
      throw new Error(`Something went wrong, ${error.message}`);
    }
  };
};
