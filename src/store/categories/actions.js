import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions"

export function categoriesFetched(data) {
  return {
    type: "CATEGORIES-FETCHED",
    payload: data,
  };
}

export async function fetchCategories(dispatch, getState) {
  dispatch(appLoading());

  const res = await axios.get(`${apiUrl}/categories`);

  const data = res.data;
  dispatch(appDoneLoading());
  dispatch(categoriesFetched(data));
}