import React, { useState, useEffect } from "react";
import ProjectSelector from "./ProjectSelector";
import QuestionCreator from "./QuestionCreator";
import QuestionDisplay from "./QuestionDisplay";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/react-hooks";
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
  const [appStatus, setAppStatus] = useState("createQuestion");
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  const [getProject, { loading, data, refetch }] = useLazyQuery(GET_PROJECTS);

  useEffect(() => {
    getProject();
    console.log("componentdidmount");
  }, []);

  if (data && data.user) {
    setCurrentProject(data.user.projects[0].id);
    console.log(data.user.projects[0].id);
  }

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <div>hello</div>
        {/* <ProjectSelector setCurrentProject={setCurrentProject} />
        {!currentQuestion.id ? (
          <QuestionCreator
            setAppStatus={setAppStatus}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
            currentProject={currentProject}
          />
        ) : (
          <QuestionDisplay
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        )} */}
      </Paper>
    </Container>
  );
};

export default App;
