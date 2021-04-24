import { ADD_PLACE, GET_PLACES } from "./actionNames";
import * as FileSystem from "expo-file-system";
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
      const fileName = imageUrl.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({ from: imageUrl, to: newPath });

      const payloadUpdated = {
        id: creationDate,
        imageUrl: newPath,
        ownerId: ownerId,
        ownerLink: ownerLink,
        date: creationDate,
        ...payload,
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
