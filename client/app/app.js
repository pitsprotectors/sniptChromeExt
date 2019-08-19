import React, { Fragment, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import QuestionCreator from "./QuestionCreator";
import QuestionDisplay from "./QuestionDisplay";
import gql from "graphql-tag";
import { Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const GetProjects = () => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR :(</p>;

  return (
    <Fragment>
      <select
        onChange={e => {
          console.log(e.target.value);
          e.preventDefault();
          setSelectedProjectId(e.target.value);
        }}
      >
        <option value="default">Please Select Your Project</option>
        {data.user.projects.length &&
          data.user.projects.map(project => {
            return (
              <option name={project.name} key={project.id} value={project.id}>
                {project.name}
              </option>
            );
          })}
      </select>
    </Fragment>
  );
};

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
  }
}));
let count = 0;

const App = () => {
  const [appStatus, setAppStatus] = useState("createQuestion");
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        {!currentQuestion.id ? (
          <QuestionCreator
            setAppStatus={setAppStatus}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
          />
        ) : (
          <QuestionDisplay
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        )}
        {/* <GetProjects /> */}
      </Paper>
    </Container>
  );
};

export default App;
