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
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({ link, cache });

// chrome.runtime.onMessage.addListener(receiver);
// chrome.storage.sync.set({ key: "hello" });

// function receiver(request, sender, sendResponse) {
//   if (request.text === "footer") {
//     console.log("message received");
//     const footer = document.getElementsByClassName(
//       "snippet-footer-container"
//     )[0];
//     footer.classList.add("active");
//   }
// }

const appMuiTheme = createMuiTheme({
  typography: {
    primary: {
      main: "Open Sans"
    },
    fontFamily: '"Open Sans", "Helvetica", "Arial", "sans-serif"',
    fontSize: 14
  }
});

function renderWarning() {
  console.log("working?");
}

console.log(document);

// render the react components to the newly created container
ReactDOM.render(
  <MuiThemeProvider theme={appMuiTheme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById("snippet-app-container")
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
