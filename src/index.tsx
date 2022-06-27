import ReactDOM from "react-dom";
import reducer from "../src/Redux/Reducer";
import {
  createTheme,
  ThemeProvider,
  experimental_sx as sx,
} from "@mui/material/styles";
import App from "./App";
import "./i18n";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./style/index.css";

const store = createStore(reducer, applyMiddleware(thunk));
Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: "https://8801155bd0b848a09de9ebf6f387ebc8@sentry.io/5183632",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e9f6e",
    },
    secondary: {
      main: "#e0e0e0",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: sx({
          pt: "10.5px",
          pb: "10.5px",
        }),
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
*/

serviceWorkerRegistration.register();
