import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_SNIPPET = gql`
  mutation CreateNewSnippet(
    $questionId: ID!
    $content: String!
    $url: String!
  ) {
    createSnippet(questionId: $questionId, content: $content, url: $url) {
      id
      content
      questionId
    }
  }
`;

const App = () => {
  const [createSnippet, { data, loading, error }] = useMutation(CREATE_SNIPPET);

  const getSelectedText = () => {
    var content = "";
    if (
      window
        .getSelection()
        .toString()
        .trim().length
    ) {
      console.log("mouseup working?");
      content = window.getSelection().toString();
      console.log(content);
      createSnippet({
        variables: {
          questionId: 1,
          content: content,
          url: "www.google.com"
        }
      });
    }
  };

  document.onmouseup = getSelectedText;

  return <div />;
};

export default App;
