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
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({ link, cache });

// create a container on the DOM for my react app
const container = document.createElement("div");
container.id = "container";

const robotoFont = document.createElement("link");
robotoFont.rel = "stylesheet";
robotoFont.href =
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";

const materialIcons = document.createElement("link");
materialIcons.rel = "stylesheet";
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";

const iframe = document.createElement("iframe");
iframe.src = chrome.runtime.getURL("/test.html");

// selected the body tag and APPEND my container to the body
const body = document.getElementsByTagName("body")[0];
body.appendChild(container);
body.appendChild(iframe);

console.log(iframe);
chrome.runtime.onMessage.addListener(receiver);

// receiving message from CE upon popup
function receiver(request, sender, sendResponse) {
  if (request.text === "footer") {
    // const head = document.getElementsByTagName("head")[0];
    // const semantic = document.createElement("link");
    // semantic.rel = "stylesheet";
    // semantic.href =
    //   "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";
    // head.appendChild(semantic);
    // head.appendChild(robotoFont);
    // head.appendChild(materialIcons);
    const footer = document.getElementsByClassName("footer-container")[0];
    footer.classList.add("active");
  }
}

// render the react components to the newly created container
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("container")
);

// console.log("is this file running?");
// chrome.storage.sync.set({ snippetsArray: [] });

// function getSelectedText() {
//   var content = "";
//   if (
//     window
//       .getSelection()
//       .toString()
//       .trim().length
//   ) {
//     console.log("mouseup working?");
//     content = window.getSelection().toString();
//     // console.log(document);
//     // console.log(window);
//     // console.log(content);
//     const newSnippetsArray = [];
//     chrome.storage.sync.get("snippetsArray", ({ snippetsArray }) => {
//       console.log(
//         "snippetsArray before setting to newSnippets: ",
//         snippetsArray
//       );
//       newSnippetsArray.push(snippetsArray.slice());
//     });
//     newSnippetsArray.push(content);
//     chrome.storage.sync.set({ snippetsArray: newSnippetsArray });
//     chrome.storage.sync.get("snippetsArray", ({ snippetsArray }) => {
//       console.log(
//         "snippetsArray after setting to newSnippets: ",
//         snippetsArray
//       );
//     });
//     // container.textContent = content;
//     // chrome.runtime.sendMessage({ content }, function(response) {
//     //   console.log("response.farewell");
//     // });
//   }
// }

// document.onmouseup = getSelectedText;
