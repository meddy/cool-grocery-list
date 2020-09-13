import { Container, LinearProgress } from "@material-ui/core";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Lists from "./Lists";
import SignIn from "./SignIn";

export default function App() {
  const [user, setUser] = useState<firebase.User | null | false>(false);
  const isLoading = user === false;
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        onSignOut={() => {
          setUser(null);
        }}
      />
      <Container component="main" maxWidth="sm">
        {isAuthenticated && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/sign-in">
              <Redirect to="/lists" />
            </Route>
            <Route exact path="/lists">
              <Lists />
            </Route>
            <Route path="*">
              <h1>Not Found</h1>
            </Route>
          </Switch>
        )}
        {!isAuthenticated && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route path="*">
              <Redirect to="/sign-in" />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
}
