import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Container,
  Button,
  FormControl,
  TextField,
  Fab,
  Select,
  Menu,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

const GET_PROJECT = gql`
  query {
    project(id: 2) {
      id
      name
      questions {
        id
        content
        snippets {
          id
        }
      }
    }
  }
`;

const ITEM_HEIGHT = 60;

const QuestionCreator = ({
  setAppStatus,
  setCurrentQuestion,
  currentQuestion
}) => {
  const classes = useStyles();

  const [newQuestion, setNewQuestion] = useState("");
  const [
    createQuestion,
    { createQuestionData, loading, error, refetch }
  ] = useMutation(CREATE_QUESTION);

  const { data } = useQuery(GET_PROJECT);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectQuestion(question) {
    console.log("handleselectquestion");
    console.log("selected quesiton", question);
    setCurrentQuestion(question);
    chrome.storage.local.set({ questionId: question.id }, function() {
      console.log("Chrome Storage questionId saved as ", question.id);
    });
    setAnchorEl(null);
  }

  if (data) console.log(data);

  return (
    <Container>
      <form
        id="createQuestionForm"
        onSubmit={async e => {
          e.preventDefault();
          const { data } = await createQuestion({
            variables: { projectId: 1, content: newQuestion }
          });
          setAppStatus("createNewSnippets");
          setCurrentQuestion(data.createQuestion);
          chrome.storage.local.set(
            { questionId: data.createQuestion.id },
            function() {
              console.log(
                "Chrome Storage questionId saved as ",
                data.createQuestion.id
              );
            }
          );
        }}
        className={classes.questionForm}
      >
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
            maxLength: 75
          }}
        />
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT,
              width: 200
            }
          }}
        >
          {data.project &&
            data.project.questions.map(question => (
              <MenuItem
                key={question.id}
                // selected={question.id === }
                onClick={() => {
                  handleSelectQuestion(question);
                }}
              >
                {question.content}
              </MenuItem>
            ))}
        </Menu>
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
