import React, { useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
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
  questionFormContainer: {
    paddingLeft: 0
  },
  questionForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: ".25rem"
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
    marginLeft: 0
  },
  fab: {
    margin: theme.spacing(1),
    width: "4.5rem"
  },
  verticalIcon: {
    padding: 0
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

const GET_PROJECT_DETAILS = gql`
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
  setCurrentQuestion,
  currentQuestion,
  currentProject
}) => {
  const classes = useStyles();

  const [newQuestion, setNewQuestion] = useState("");
  const [createQuestion, {}] = useMutation(CREATE_QUESTION);

  const { loading, data, error } = useQuery(GET_PROJECT_DETAILS);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectQuestion(question) {
    setCurrentQuestion(question);
    chrome.storage.local.set({ questionId: question.id }, function() {
      console.log("Chrome Storage questionId saved as ", question.id);
    });
    setAnchorEl(null);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <Container className={classes.questionFormContainer}>
      <form
        id="createQuestionForm"
        onSubmit={async e => {
          e.preventDefault();
          const res = await createQuestion({
            variables: { projectId: 2, content: newQuestion }
          });
          setCurrentQuestion(res.data.createQuestion);
          chrome.storage.local.set(
            { questionId: res.data.createQuestion.id },
            function() {
              console.log(
                "Chrome Storage questionId saved as ",
                res.data.createQuestion.id
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
          className={classes.verticalIcon}
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
              width: "410px"
            }
          }}
        >
          {data &&
            data.project &&
            data.project.questions.map(question => (
              <MenuItem
                key={question.id}
                // selected={question.id === }
                onClick={() => {
                  handleSelectQuestion(question);
                }}
                style={{
                  width: "400px"
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
    </Container>
  );
};

export default QuestionCreator;
