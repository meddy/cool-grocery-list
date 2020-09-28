import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container, LinearProgress } from "@material-ui/core";
import firebase from "firebase/app";

import GroceryLists from "./GroceryLists";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import SignIn from "./SignIn";

// const db = firebase.firestore();

export default function App() {
  const [user, setUser] = useState<firebase.User | null | false>(false);
  const isLoading = user === false;
  const isAuthenticated = !!user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
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
            <Route component={Home} exact path="/" />
            <Route
              exact
              path="/sign-in"
              render={() => <Redirect to="/lists" />}
            />
            <Route component={GroceryLists} exact path="/lists" />
            <Route component={NotFound} path="*" />
          </Switch>
        )}
        {!isAuthenticated && (
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={SignIn} exact path="/sign-in" />
            <Route path="*" render={() => <Redirect to="/sign-in" />} />
          </Switch>
        )}
      </Container>
    </>
  );
}
