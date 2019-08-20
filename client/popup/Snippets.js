import React, {useState, useMemo, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SeeMore from  "./seeMore"
 
export default function Snippets({questionId, setSnippets, snippets}) {
    const GET_QUESTION_DETAILS = gql`
    query GetquestionDetails($questionId: ID!) {
        question(id: $questionId) {
            snippets{
                content
            }
        }
    }
    `
    const {data, loading, error} = useQuery(GET_QUESTION_DETAILS, {
        variables: {questionId: questionId}
      })
     return (
         <div>
            {
                snippets?
                <SeeMore questionId={questionId} snippets={snippets} />
                :
                <button onClick={()=>{
                     setSnippets(data.question.snippets)
                }}>What was my answer?</button>
            }
             
         </div>
     )
 }
 
