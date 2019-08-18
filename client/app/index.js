import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./app";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
if (!global._babelPolyfill) {
  require("babel-polyfill");
}

// Apollo client set up
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({ link, cache });

// custom Material UI theme to be provided to entire app
const appMuiTheme = createMuiTheme({
  typography: {
    primary: {
      main: "Open Sans"
    },
    fontFamily: '"Open Sans", "Helvetica", "Arial", "sans-serif"',
    fontSize: 14
  }
});

// render the react components to the newly created container
ReactDOM.render(
  <MuiThemeProvider theme={appMuiTheme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById("snippet-app-container")
);
