//import NewTab from './pages/new-tab';
import React, {useState, useMemo, useEffect}from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from '@apollo/react-hooks'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'

import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Randomquestion from "./Randomquestion"
//import Snippets from "./Snippets.js"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const cache = new InMemoryCache()
const link = new createHttpLink({
  uri: 'http://localhost:4000/graphql'
})
const client = new ApolloClient({link, cache})
const ME = gql`
query ME{
  me{
    projects{
      id
      name
    }
  }
}
`
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function NewTab() {
  const classes = useStyles();
  const {data, loading, error}= useQuery(ME)
  const [project, setProject] = useState('')
  const [question, setQuestion] = useState('')
  const [snippets, setSnippets] = useState('')
  console.log("index", data)
  useEffect(() => {
    if (data.me && !project) {
      setProject(data.me.projects[Math.floor(Math.random()*data.me.projects.length)])
    }else if(!data.me){
      setProject(false)
    }
    //if (project.questions && !question) setQuestion(project.questions[Math.floor(Math.random()*project.questions.length)])
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Paper className={classes.root} display="flex" justifyContent="center" alignItems="center" alignItems="center">
      <Typography variant="h5" component="h3">
        Snipts
      </Typography>
      <Typography component="p">
      {project?
        <div>
          <h2>This question comes from: {project.name}</h2>
          <Randomquestion projectId={project.id} setQuestion={setQuestion} setSnippets={setSnippets} question={question} snippets={snippets}/>
        </div>
        :
        <p>Maybe...Just Maybe...You need to create a new Project and Ask Yourself some Qestions</p>
      }
    </Typography>
    </Paper>
    // <div>
    //   <h1>Snipts</h1>
    //   {project?
    //     <div>
    //       <h2>This question comes from: {project.name}</h2>
    //       <Randomquestion projectId={project.id} setQuestion={setQuestion} setSnippets={setSnippets} question={question} snippets={snippets}/>
    //     </div>
    //     :
    //     <p>Maybe...Just Maybe...You need to create a new Project and Ask Yourself some Qestions</p>
    //   }

    // </div>
  )
}


render(
  <ApolloProvider client={client}>
    <NewTab />
  </ApolloProvider>, 
  window.document.getElementById('container'));




  // {question ? 
  // <div>
  //   <h3>Question:{question.content}</h3>
    
  //   {
  //     snippets?
  //     snippets.map((s)=>{
  //         return(
  //             <p>{s.content}</p>
  //         )
  //     }):
  //     <button onClick={()=>{setSnippets(question.snippets)}}>What was my answer?</button>
  //   }
  // </div>
  // :
  // <p>You Don't Have Any Pending Question Under This Project</p>
  // }