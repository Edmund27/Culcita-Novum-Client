import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import listingReducer from "./listings/reducer";
import categoryReducer from "./categories/reducer"
import users from "./users/reducer";
import chats from "./chats/reducer";


export default combineReducers({
  appState,
  user,
  listingReducer,
  categoryReducer,
  users,
  chats
});
