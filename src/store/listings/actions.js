import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions"

export function listingsFetched(data) {
  return {
    type: "LISTINGS-FETCHED",
    payload: data,
  };
}

export async function fetchListings(dispatch, getState) {
  dispatch(appLoading());

  const res = await axios.get(apiUrl);

  const data = res.data;
  dispatch(appDoneLoading());
  dispatch(listingsFetched(data));
}