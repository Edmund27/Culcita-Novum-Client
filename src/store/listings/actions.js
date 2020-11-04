import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions"

export function listingsFetched(listings) {
  return {
    type: "LISTINGS-FETCHED",
    payload: listings,
  };
}

export async function fetchListings(dispatch, getState) {
  dispatch(appLoading());

  const res = await axios.get(`${apiUrl}/listings`);
  const data = res.data;
  // console.log("fetchListings -> data", data)
  dispatch(appDoneLoading());
  dispatch(listingsFetched(data));
}