import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetails($projectId: ID!) {
    project(id: $projectId) {
      id
      name
      questions {
        id
        content
      }
    }
  }
`;

export default function QuestionSelector({
  projectId,
  setNewSnippetQuestionId
}) {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_DETAILS, {
    variables: { projectId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      <h3>SELECT YOUR QUESTION FOR PROJECT: {projectId}</h3>
      <select
        onChange={e => {
          console.log(e.target.value);
          e.preventDefault();
          setNewSnippetQuestionId(e.target.value);
        }}
      >
        <option value="default">Please Select Your Question</option>
        {data.project.questions.length &&
          data.project.questions.map(question => {
            return (
              <option
                name={question.content}
                key={question.id}
                value={question.id}
              >
                {question.content}
              </option>
            );
          })}
      </select>
    </Fragment>
  );
}
