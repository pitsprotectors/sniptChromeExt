//import NewTab from './pages/new-tab';
import React, {useState, useMemo, useEffect}from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from '@apollo/react-hooks'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'

import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import Randomquestion from "./Randomquestion"
import Snippets from "./Snippets.js"

const cache = new InMemoryCache()
const link = new createHttpLink({
  uri: 'http://localhost:4000/graphql'
})
const client = new ApolloClient({link, cache})
export default function NewTab() {
  const ME = gql`
    query me{
      projects{
        id
        name
        questions{
            id
            content
            snippets{
              content
          }
        }
      }
    }
  `
  const {data, loading, error}= useQuery(ME)
  const [project, setProject] = useState('')
  const [question, setQuestion] = useState('')
  const [snippets, setSnippets] = useState('')
  useEffect(() => {
    if (data.projects && !project) setProject(data.projects[Math.floor(Math.random()*data.projects.length)])
    console.log(project)
    if (project.questions && !question) setQuestion(project.questions[Math.floor(Math.random()*project.questions.length)])
    //if (question) setSnippets(question.snippets)
  })
  //console.log("Bottotototm")
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  //console.log(project.questions)
  return (
    <div>
      <h1>Snipts</h1>
      <h2>This question comes from: {project.name}</h2>
      {question ? 
      // project.questions.map((q)=>{
      //   return(
      //     <div>
      //       <p>{q.content}</p>
      //       <button>Show me the Snipts to this question</button>
      //     </div>
      //     )
      // })
      //<Randomquestion question= {question} setSnippets={setSnippets} snippets={snippets}/>
      <div>
        <h3>Question:{question.content}</h3>
        {/* <Snippets questionId= {question.id} setSnippets={setSnippets} snippets={snippets} /> */}
        
        {
          snippets?
          snippets.map((s)=>{
              return(
                  <p>{s.content}</p>
              )
          }):
          <button onClick={()=>{setSnippets(question.snippets)}}>What was my answer?</button>
        }
      </div>
      :
      <p></p>
      }
    </div>
  )
}


render(
  <ApolloProvider client={client}>
    <NewTab />
  </ApolloProvider>, 
  window.document.getElementById('container'));






// const CronJob = require('cron').CronJob


// const options={
//   type:"basic",
//   title:"New Snipts!",
//   iconUrl:"./js/1906_v2.jpg",
//   message: "You just created new snipts"
// }
// // chrome.notifications.create(options,callback)
// chrome.notifications.onClicked.addListener(redirectWindow);
// function redirectWindow(){
//   console.log("redirectWindow")
//   chrome.tabs.create({url:"http://localhost:4000/"})
// }

// function callback(){
//   console.log("callback!!!")
// }

// const job=new CronJob ("* * * * *", ()=>{chrome.notifications.create(options,callback)})
// console.log('After job instantiation');
// job.start();








// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";

// import "babel-polyfill";

// const GET_PROJECTS = gql`
//   query {
//     user(id: 1) {
//       projects {
//         name
//         id
//       }
//     }
//   }
// `;


// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       currentHighlight: "",
//       projects: [],
//       selectedProject: "General",
//       questions:[],
//       selectedQuestion:"new"
//     };
//     this.syncStorageToState = this.syncStorageToState.bind(this);
//     this.handleSave = this.handleSave.bind(this);
//     this.onSelect= this.onSelect.bind(this)
//     this.onChange=this.onChange.bind(this)
//   }
// /////////////////////////////////////////////////
//   syncStorageToState() {
//     let bgpage = chrome.extension.getBackgroundPage();
//     let snipts = bgpage.snipts;
//     this.setState({currentHighlight:snipts})
//   }
// //////////////////////////////////////////////////
//   async handleSave(event) {
//     event.preventDefault()
//     let newQuestionId;
//     if(this.state.selectedQuestion==="new"){
//       const val = document.getElementById("myText").value
//       console.log(val)
//       const CREATE_QUESTION= gql`
//         mutation{
//           createQuestion(projectId: ${this.state.selectedProject}, content: "${val}"){
//             id
//           }
//         }
//       `
//       const RES = await client.mutate({
//         mutation: CREATE_QUESTION
//       });
//       console.log(RES)
//       newQuestionId= +RES.data.createQuestion.id
//     }
//     else{
//       newQuestionId= +this.state.selectedQuestion
//     }
//     console.log(this.state.currentHighlight)
//     for(let i=0; i<this.state.currentHighlight.length; i++){
//       console.log("currentHighlight: ", this.state.currentHighlight[i])
//       const CREATE_SNIPPET = gql`
//         mutation{
//           createSnippet(questionId: ${newQuestionId}, content: "${this.state.currentHighlight[i]}", url: "www.google.com"){
//             id
//           }
//         }
//       `;
//       const { data } = await client.mutate({
//         mutation: CREATE_SNIPPET
//       });
//       console.log("data: ", data)
//     }

//     chrome.runtime.sendMessage({text: "clear"});
//     this.setState({ currentHighlight: "" });
//     const notifOptions ={
//       type:"basic",
//       iconUrl:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png",
//       title:"New Snipts!",
//       message: "You just created new snipts"
//     }
//     chrome.notifications.create("newSnipt", notifOptions)
//   }
// //////////////////////////////////////////////////
//   async componentDidMount() {
//     this.syncStorageToState()
//     const { data } = await client.query({
//       query: GET_PROJECTS
//     });
//     this.setState({
//       projects: data.user.projects
//     });

//   }
// //////////////////////////////////////////////////
//   async onSelect(event){
//     event.preventDefault();
//     console.log("are we here", event.target.value)
//     this.setState({selectedProject: event.target.value})
//     if(this.state.selectedProject!=="General"){
//       const GET_Questions = gql`
//       query {
//         project(id:${+this.state.selectedProject}) {
//           questions{
//             id
//             content
//           }
//         }
//       }
//     `;
//       const { data } = await client.query({
//         query: GET_Questions
//       });
//       this.setState({questions:data.project.questions})
//     }
//   }
// //////////////////////////////////////////////////
//   async onChange(event){
//     event.preventDefault();
//     this.setState({selectedQuestion: event.target.value})
//   }
// //////////////////////////////////////////////////
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSave}>
//           <label>Project Name:</label>
          
//           <select onChange={this.onSelect}>
//             <option value="General">------</option>
//             {this.state.projects.length && this.state.projects.map((project)=>{
//               return <option name={project.name} key={project.id} value={project.id}>{project.name}</option>
//             })}
//           </select>
          
          
//           <div>
//            <label>Question:</label>
//             <select onChange={this.onChange}>
//               <option value="new">New Question</option>
//               {this.state.questions.length && this.state.questions.map((question)=>{
//                 return(
//                   <option name={question.content} key={question.id} value={question.id}>{question.content}</option>
//                 )
//               })
//               }
//             </select>
//             {
//               this.state.selectedQuestion==="new"&&
//               <input type="text" id="myText"></input> 
//             } 
//           </div>
          
          
//           <div>
//             <label>SNIPTS:</label>
//             {this.state.currentHighlight.map && this.state.currentHighlight.map((snipt)=>{
//               return(
//                   <p>
//                   Snipt: {snipt}
//                   <button>Delete</button>
//                   </p>
//               )
//             })}
//           </div>
//           <button type = "submit">SAVE</button>
//         </form>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("container"));


