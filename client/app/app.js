import React, { Fragment, useState } from "react";
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
    backgroundColor: "white",
    height: "5rem",
    width: "100%",
    borderRadius: "3rem"
  }
}));

const App = () => {
  const [appStatus, setAppStatus] = useState("createQuestion");
  const [currentQuestion, setCurrentQuestion] = useState({
    content: "How do camels store water in their backs like that?"
  });
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        {appStatus !== "createQuestion" ? (
          <QuestionCreator
            setAppStatus={setAppStatus}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
          />
        ) : (
          <QuestionDisplay currentQuestion={currentQuestion} />
        )}
        {/* <GetProjects /> */}
      </Paper>
    </Container>
  );
};

export default App;

{
  /* <body onkeydown="myFunction(event)">

<h1>Document execCommand() Method</h1>

<p>The executeCommand() method executes a specified command on selected text or section.</p>

<h2>Select Text and Press Shift</h2>
<p>Select some text in this page, and press the SHIFT button to make the selected text toggle between bold and normal.</p>

<script>
document.designMode = "on";

function myFunction(event) {
if(document.querySelector('span[style*="background-color: rgb(111, 228, 252);"]') !== null) {
   console.dir(document.querySelector('span[style*="background-color: rgb(111, 228, 252);"]').parentNode)
   var parent = document.querySelector('span[style*="background-color: rgb(111, 228, 252);"]').parentNode
   parent.innerHTML = parent.innerText
        //var elem = document.querySelector("#content p");
        //var txt = elem.innerText || elem.textContent;
        //elem.innerHTML = txt;
   }
  if (event.keyCode == 16) {
    // Execute command if user presses the SHIFT button:
    document.execCommand("BackColor", false, "#6fe4fc")
  }
}
</script> */
}
