import { ADD_PLACE, GET_PLACES, DELETE_PLACE } from "./actionNames";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import Place from "../../models/place";
import { insertPlace, fetchPlaces, deletePlace } from "../../helpers/db";
import ENV from "../../env";

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const responseData = await fetchPlaces();
      dispatch({ type: GET_PLACES, payload: responseData.rows._array });
    } catch (error) {
      throw new Error(
        `Something went wrong, fetching the data. details:[${error.message}]`
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          payload.location.latitude
        },${payload.location.longitude}&key=${ENV().googleApiKey}`
      );

      if (!response) {
        const responseError = await response.json();
        throw new Error(
          `Something went wrong with google, [Error Details] ${responseError.message}`
        );
      }

      const responseData = await response.json();
      if (!responseData.results) {
        throw new Error(`Something went wrong with google results`);
      }

      const locationAddress = responseData.results[0].formatted_address;

      console.log("locationAddress", locationAddress);

      const fileName = payload.imageUrl.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({ from: payload.imageUrl, to: newPath });

      const payloadUpdated = {
        id: creationDate,
        imageUrl: newPath,
        ownerId: ownerId,
        ownerLink: ownerLink,
        creationDate: creationDate,
        address: locationAddress,
        ...payload,
      };

      const dbResult = await insertPlace(payloadUpdated);

      dispatch({
        type: ADD_PLACE,
        payload: { id: dbResult.insertId, ...payloadUpdated },
      });
    } catch (error) {
      throw new Error(`Something went wrong, ${error.message}`);
    }
  };
};

export const deletePlaces = (payload) => {
  return async (dispatch) => {
    try {
      const dbResult = await deletePlace(payload);

      dispatch({
        type: DELETE_PLACE,
        payload: payload,
      });
    } catch (error) {
      throw new Error("Something went wrong deleting the place");
    }
  };
};
