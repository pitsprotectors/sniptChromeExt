import React, { Fragment, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import QuestionCreator from "./QuestionCreator";
import gql from "graphql-tag";

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

const App = () => {
  const [appStatus, setAppStatus] = useState("createQuestion");
  const [currentQuestion, setCurrentQuestion] = useState(undefined);
  return (
    <div className="footer-container">
      {appStatus === "createQuestion" ? (
        <QuestionCreator
          setAppStatus={setAppStatus}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : (
        <div>Current Question: {currentQuestion.content}</div>
      )}
      {/* <GetProjects /> */}
    </div>
  );
};

export default App;
