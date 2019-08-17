import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button } from "semantic-ui-react";

const CREATE_QUESTION = gql`
  mutation CreateNewQuestion($projectId: ID!, $content: String!) {
    createQuestion(projectId: $projectId, content: $content) {
      id
      content
      projectId
    }
  }
`;

const QuestionCreator = ({ setAppStatus, setCurrentQuestion }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [createQuestion, { data, loading, error }] = useMutation(
    CREATE_QUESTION
  );
  if (data) setCurrentQuestion(data.createQuestion);
  return (
    <div>
      <h3>What would you like to learn today?</h3>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("is this happening?");
          await createQuestion({
            variables: { projectId: 1, content: newQuestion }
          });
          setAppStatus("createNewSnippets");
        }}
      >
        <label>Create a New Question: </label>
        <input
          type="text"
          id="newQuestion"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />
        <button type="submit">CREATE</button>
        <Button>HELLO BUTTON</Button>
      </form>
      {newQuestion}
    </div>
  );
};

export default QuestionCreator;
