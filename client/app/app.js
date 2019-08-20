import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ProjectSelector from "./ProjectSelector";
import QuestionCreator from "./QuestionCreator";
import QuestionDisplay from "./QuestionDisplay";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: ".5rem"
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    height: "5rem",
    width: "100%",
    borderRadius: "3rem"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  fab: {
    margin: theme.spacing(1)
  },
  bookIconButton: {
    width: "4rem",
    height: "4rem",
    marginLeft: "1rem",
    marginTop: ".5rem"
  },
  bookIconSvg: {
    color: "#000000",
    padding: 0
  }
}));

const GET_PROJECTS = gql`
  query projectList {
    user(id: 1) {
      projects {
        id
        name
      }
    }
  }
`;

const App = () => {
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <ProjectSelector
          setCurrentProject={setCurrentProject}
          projectList={data.user.projects}
        />
        {!currentQuestion.id ? (
          <QuestionCreator
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
            currentProject={currentProject}
          />
        ) : (
          <QuestionDisplay
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        )}
      </Paper>
    </Container>
  );
};

export default App;
