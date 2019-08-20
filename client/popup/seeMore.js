import React, {useState, useMemo, useEffect, Fragment} from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

export default function SeeMore({questionId,snippets}) {
    const SEE_MORE = gql`
    mutation reset($questionId: ID!) {
        questionStart(id: $questionId) {
            id
        }
    }
    `
    const [seeMore,{data, loading, error}] = useMutation(SEE_MORE, {
        variables: {questionId: questionId}
      })
     return (
         <div>   
                {snippets.map((s)=>{
                    return(
                        <p>{s.content}</p>
                    )
                })}
                <button
                onClick={
                    ()=>{
                        seeMore()
                        alert("This problem's learning period begins now")
                    }
                }
                >I have no clue what the answer is, and I need to know this
                </button>
         </div>
     )
 }

