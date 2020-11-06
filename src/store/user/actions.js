import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";
import socket from '../../socket'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};
const userInfo = (data) => {
  return {
    type: "USER_PROFILE",
    payload: data,
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

export function postCreated(data) {
  return {
    type: "POST_CREATED",
    payload: data,
  };
}

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, surname, email, password, image, lat, lng) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        surname,
        email,
        password,
        image,
        lat,
        lng
      });

      socket.emit('openMessages', email)
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      socket.emit('openMessages', email)
      console.log(response.data)
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const fetchUserInfo = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const response = await axios.get(`${apiUrl}/mypage`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetchUserInfo -> response", response)

      dispatch(userInfo(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };
};



export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/mypage`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      socket.emit('openMessages', response.data.email)
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function addPost(title, description, image, categoryId) {
  return async function (dispatch, getState) {
    const token = selectToken(getState());

    if (token === null) return;
    try {
      const response = await axios.post(
        `${apiUrl}/create`,
        {
          title,
          description,
          image,
          categoryId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response)

      dispatch(postCreated());
    } catch (error) {
      console.log(error);
    }
  };
}