import React, {useState, useMemo, useEffect} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Snippets from "./Snippets.js"

const ONLYSHOW = gql`
query onlyshow($projectId: ID!){
  show(id: $projectId){
    id
    content
  }
}
`
export default function Randomquestion({projectId, setQuestion, setSnippets,question,snippets}) {
    const {data, loading, error, refetch}= useQuery(ONLYSHOW,{
        variables: {projectId: projectId}
    })
    useEffect(() => {
        if(data === undefined){console.log("randomequestion?",data)}
        else if (data.show && !question) {
          setQuestion(data.show[Math.floor(Math.random()*data.show.length)])
        }else if(!data.show){
          setQuestion(false)
        }
        console.log(question.id)
      })
    return (
        <div>
            
            {question?
            <div>
                <h3>Question:{question.content}</h3>
                <Snippets questionId= {question.id} setSnippets={setSnippets} snippets={snippets} />
            </div>
            :
            <p>My friend this Project has no pending question for today</p>
            }
        </div>
    )
}
