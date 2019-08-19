// import React from "react";
// import ReactDOM from "react-dom";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { ApolloProvider } from "@apollo/react-hooks";
// import App from "./app";
// if (!global._babelPolyfill) {
//   require("babel-polyfill");
// }

// const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: "http://localhost:4000/graphql"
// });
// const client = new ApolloClient({ link, cache });

// // sending message upon popup to content script
// export default async function notify() {
//   await setTimeout(function() {
//     chrome.notifications.create(
//       {
//         type: "basic",
//         title: "Check your snipts",
//         message: "It's time to learn! click here to check your snipts!"
//       },
//       (onClick = () => {
//         chrome.tabs.create({ url: "http://localhost:4000" });
//       })
//     );
//   }, 3000);
// }

// notify();

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById("container")
// );
