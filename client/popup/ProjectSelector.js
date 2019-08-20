import React, { useState, useEffect, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import QuestionSelector from "./QuestionSelector";
import QuestionCreator from "./QuestionCreator";

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

export default function ProjectSelector({ setNewSnippetQuestionId }) {
  const [selectedProjectId, setSelectedProjectId] = useState(0);
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
      {!!selectedProjectId && (
        <div>
          <QuestionSelector
            projectId={selectedProjectId}
            setNewSnippetQuestionId={setNewSnippetQuestionId}
          />
          {/* <QuestionCreator projectId={selectedProjectId} /> */}
        </div>
      )}
    </Fragment>
  );
}
