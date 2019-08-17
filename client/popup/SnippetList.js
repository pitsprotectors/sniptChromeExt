import React, { useState, useEffect, Fragment } from "react";
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
      url
    }
  }
`;

function CreateSnippet({
  currentSnippetsArray,
  setCurrentSnippetsArray,
  newSnippetQuestionId
}) {
  const [createSnippet, { data, loading, error }] = useMutation(CREATE_SNIPPET);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => {
          currentSnippetsArray.forEach(snippet => {
            createSnippet({
              variables: {
                questionId: newSnippetQuestionId,
                content: snippet,
                url: "www.google.com"
              }
            });
          });
          chrome.runtime.sendMessage({ text: "clear" });
          setCurrentSnippetsArray([]);
        }}
      >
        SAVE
      </button>
    </Fragment>
  );
}

const SnippetList = ({ newSnippetQuestionId }) => {
  const [currentSnippetsArray, setCurrentSnippetsArray] = useState([
    "Initial Snippet 1",
    "Initial Snippet 2"
  ]);

  // 1. Retrieve access to background page through Chrome API
  // 2. Retrieve snippetsArray from background page Window API
  // 3. Set state currentSnippetsArray to retrieved array
  const syncStorageToState = () => {
    let backgroundPage = chrome.extension.getBackgroundPage();
    let snippetsArray = [];
    if (backgroundPage) snippetsArray = backgroundPage.snippetsArray;
    setCurrentSnippetsArray(snippetsArray);
  };

  // Empty array as second argument enables lifecycle only on mount
  useEffect(() => {
    syncStorageToState();
  }, []);

  return (
    <div>
      <h1>SNIPPET LIST</h1>
      {currentSnippetsArray.map((snippet, i) => (
        <div key={i}>
          Snippet {i}: {snippet}
        </div>
      ))}
      <CreateSnippet
        currentSnippetsArray={currentSnippetsArray}
        setCurrentSnippetsArray={setCurrentSnippetsArray}
        newSnippetQuestionId={newSnippetQuestionId}
      />
    </div>
  );
};

export default SnippetList;
