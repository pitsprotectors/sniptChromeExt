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
    const {data, loading, error}= useQuery(ONLYSHOW,{
        variables: {projectId: projectId}
    })
    useEffect(() => {
        console.log("randomequestion?",data)
        if (data.show && !question) {
          setQuestion(data.show[Math.floor(Math.random()*data.show.length)])
        }else if(!data.show){
          setQuestion(false)
        }
        //if (project.questions && !question) setQuestion(project.questions[Math.floor(Math.random()*project.questions.length)])
      })
    return (
        <div>
            
            {question?
            <div>
                <h3>Question:{question.content}</h3>
                <Snippets questionId= {question.id} setSnippets={setSnippets} snippets={snippets}/>
            </div>
            :
            <p>My friend this Project is cleaned</p>
            }
        </div>
    )
}
