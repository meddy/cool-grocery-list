import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import App from "./App";
import firebaseConfig from "./firebase.config.json";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
