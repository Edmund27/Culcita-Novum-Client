import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/HomePage"
import MyPage from "./pages/MyPage"
import CreateListing from "./pages/CreateListing";
import ListingPage from "./pages/ListingPage";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import UserPage from "./pages/UserPage"

import ChatPage from "./pages/ChatPage";
import ChatWindow from "./components/ChatWindow";




function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/listings/:id" component={ListingPage} />
        <Route path="/listings/user/:id" component={UserPage} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={CreateListing} />
        <Route path="/messages" component={ChatPage} />
        <Route path="/chat-screen" component={ChatWindow} />
      </Switch>
    </div>
  );
}

export default App;
