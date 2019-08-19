import React, {useState, useMemo, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
 
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
    const {data, loading, error, refetch} = useQuery(GET_QUESTION_DETAILS, {
        variables: {questionId: questionId}
      })
    console.log("lolo:",data.question)
    //const [s, setS] = useState('')
    // useEffect(() => {
    //     if (data.snippets && !s) setS(data.snippets)
    //   })
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>ERROR: {error.message}</p>
     return (
         <div>
            {
                snippets?
                snippets.map((s)=>{
                    return(
                        <p>{s.content}</p>
                    )
                }):
                <button onClick={()=>{
                     setSnippets(data.question.snippets)
                }}>What was my answer?</button>
            }
             
         </div>
     )
 }
 