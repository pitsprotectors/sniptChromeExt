import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Container,
  Button,
  FormControl,
  TextField,
  Fab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  questionForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: ".25rem"
  },
  textField: {
    width: "25rem",
    margin: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

const CREATE_QUESTION = gql`
  mutation CreateNewQuestion($projectId: ID!, $content: String!) {
    createQuestion(projectId: $projectId, content: $content) {
      id
      content
      projectId
      snippets {
        id
      }
    }
  }
`;

const QuestionCreator = ({
  setAppStatus,
  setCurrentQuestion,
  currentQuestion
}) => {
  const classes = useStyles();

  const [newQuestion, setNewQuestion] = useState("");
  const [createQuestion, { data, loading, error, refetch }] = useMutation(
    CREATE_QUESTION
  );

  if (data) {
    setCurrentQuestion(data.createQuestion);
    console.log("new question data: ", data.createQuestion);
  }
  return (
    <Container>
      <form
        id="createQuestionForm"
        onSubmit={async e => {
          e.preventDefault();
          console.log("is this happening?");
          await createQuestion({
            variables: { projectId: 1, content: newQuestion }
          });
          setAppStatus("createNewSnippets");
        }}
        className={classes.questionForm}
      >
        {/* <input
          type="text"
          id="newQuestion"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        /> */}
        <TextField
          id="outlined-with-placeholder"
          label="What would you like to learn today?"
          placeholder="Insert your question here"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          inputProps={{
            maxLength: 100
          }}
        />
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          form="createQuestionForm"
        >
          CREATE
        </Button> */}
        <Fab
          type="submit"
          color="primary"
          aria-label="Add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </form>
      {newQuestion}
    </Container>
  );
};

export default QuestionCreator;
