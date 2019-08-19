import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./app";
if (!global._babelPolyfill) {
  require("babel-polyfill");
}

// document.addEventListener("keydown", logkey);
const handleActivateApp = e => {
  console.log(e.key);
  console.log("working");
  if (e.key === "`") {
    const iframeDocument = document.getElementsByClassName(
      "snippet-iframe-container"
    )[0];
    !iframeDocument.classList.contains("active")
      ? iframeDocument.classList.add("active")
      : iframeDocument.classList.remove("active");
  }
};

// inject iframe into DOM
const iframe = document.createElement("iframe");
iframe.classList.add("snippet-iframe-container");
iframe.src = chrome.runtime.getURL("/app.html");

// inject container for react app into DOM
const contentContainer = document.createElement("div");
contentContainer.id = "snippet-content-container";

// inject container for react app into DOM
const popupContainer = document.createElement("div");
popupContainer.id = "snippet-popup-container";

const respondToMouseOver = event => {
  document.querySelector("#snippet-popup-container").classList.add("active");
};

const respondToMouseOut = event => {
  document.querySelector("#snippet-popup-container").classList.remove("active");
};

popupContainer.addEventListener("mouseover", respondToMouseOver);
popupContainer.addEventListener("mouseout", respondToMouseOut);

// selected the body tag to APPEND iframe + react app
const body = document.getElementsByTagName("body")[0];
body.addEventListener("keydown", handleActivateApp);
body.appendChild(iframe);
body.appendChild(contentContainer);
contentContainer.appendChild(popupContainer);

// listen to messages from popup.js
chrome.runtime.onMessage.addListener(receiver);

// receiving message from popup on start to activate iframe
function receiver(request, sender, sendResponse) {
  if (request.text === "footer") {
    console.log("footer message received");
    const iframeDocument = document.getElementsByClassName(
      "snippet-iframe-container"
    )[0];
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
  document.getElementById("snippet-popup-container")
);
