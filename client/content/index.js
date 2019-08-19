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

// inject iframe into DOM
const iframe = document.createElement("iframe");
iframe.classList.add("snippet-iframe-container");
iframe.src = chrome.runtime.getURL("/app.html");

// inject container for react app into DOM
const contentContainer = document.createElement("div");
contentContainer.id = "snippet-content-container";

// selected the body tag to APPEND iframe + react app
const body = document.getElementsByTagName("body")[0];
body.appendChild(iframe);
body.appendChild(contentContainer);

// listen to messages from popup.js
chrome.runtime.onMessage.addListener(receiver);

// receiving message from popup on start to activate iframe
function receiver(request, sender, sendResponse) {
  if (request.text === "footer") {
    console.log("message received");
    const iframeDocument = document.getElementsByClassName(
      "snippet-iframe-container"
    )[0];
    html.classList.add("snippet-html");
    iframeDocument.classList.add("active");
  }
}

// Apollo client set up
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({ link, cache });

// render the react components to the newly created container
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("snippet-content-container")
);
