import React, {useState, useMemo, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Snippets from "./Snippets.js"

export default function Randomquestion(question, setSnippets, snippets) {
    // const GET_PROJECT_DETAILS = gql`
    // query GetProjectDetails($projectId: ID!) {
    //     project(id: $projectId) {
    //         questions{
    //             id
    //             content
    //         }
    //     }
    // }
    // `
    // const {data, loading, error, refetch} = useQuery(GET_PROJECT_DETAILS, {
    //     variables: {projectId: projectId}
    //   })
    // const [question, setQuestion] = useState('')
    // useEffect(() => {
    //     if (data.questions) setQuestion(data.questions[Math.floor(Math.random()*data.questions.length)])
    //   })
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>ERROR: {error.message}</p>
    return (
        <div>
            <h3>Question:{question.content}</h3>
            {question?
            // <h3>{question.content}</h3>
            <Snippets questionId= {question.id} setSnippets={setSnippets} snippets={snippets}/>
            :
            <p></p>
            }
        </div>
    )
}
