import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Input, Container, Header, Button, Divider, Segment, List} from 'semantic-ui-react'
import "babel-polyfill";
import App from "./app";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({ link, cache });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("container")
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentHighlight: "",
      projects: [],
      selectedProject: "General",
      questions:[],
      selectedQuestion:"new"
    };
    this.syncStorageToState = this.syncStorageToState.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onSelect= this.onSelect.bind(this)
    this.onChange=this.onChange.bind(this)
  }
/////////////////////////////////////////////////
  syncStorageToState() {
    let bgpage = chrome.extension.getBackgroundPage();
    let snipts = bgpage.snipts;
    this.setState({currentHighlight:snipts})
  }
//////////////////////////////////////////////////
  async handleSave(event) {
    event.preventDefault()
    let newQuestionId;
    if(this.state.selectedQuestion==="new"){
      const val = document.getElementById("myText").value
      console.log(val)
      const CREATE_QUESTION= gql`
        mutation{
          createQuestion(projectId: ${this.state.selectedProject}, content: "${val}"){
            id
          }
        }
      `
      const RES = await client.mutate({
        mutation: CREATE_QUESTION
      });
      console.log(RES)
      newQuestionId= +RES.data.createQuestion.id
    }
    else{
      newQuestionId= +this.state.selectedQuestion
    }
    console.log(this.state.currentHighlight)
    for(let i=0; i<this.state.currentHighlight.length; i++){
      console.log("currentHighlight: ", this.state.currentHighlight[i])
      const CREATE_SNIPPET = gql`
        mutation{
          createSnippet(questionId: ${newQuestionId}, content: "${this.state.currentHighlight[i]}", url: "www.google.com"){
            id
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: CREATE_SNIPPET
      });
      console.log("data: ", data)
    }

    chrome.runtime.sendMessage({text: "clear"});
    this.setState({ currentHighlight: "" });
  }
//////////////////////////////////////////////////
  async componentDidMount() {
    this.syncStorageToState()
    const { data } = await client.query({
      query: GET_PROJECTS
    });
    this.setState({
      projects: data.user.projects
    });

  }
//////////////////////////////////////////////////
  async onSelect(event){
    event.preventDefault();
    console.log("are we here", event.target.value)
    this.setState({selectedProject: event.target.value})
    if(this.state.selectedProject!=="General"){
      const GET_Questions = gql`
      query {
        project(id:${+this.state.selectedProject}) {
          questions{
            id
            content
          }
        }
      }
    `;
      const { data } = await client.query({
        query: GET_Questions
      });
      this.setState({questions:data.project.questions})
    }
  }
//////////////////////////////////////////////////
  async onChange(event){
    event.preventDefault();
    this.setState({selectedQuestion: event.target.value})
  }
//////////////////////////////////////////////////
  render() {
    return (
      <div>
        <form onSubmit={this.handleSave}>

          <label>Project Name:</label>

          <select onChange={this.onSelect}>
            <option value="General">------</option>
            {this.state.projects.length && this.state.projects.map((project)=>{
              return <option name={project.name} key={project.id} value={project.id}>{project.name}</option>
            })}
          </select>
          <Divider hidden />


          <div>
           <label>Question:</label>
            <select onChange={this.onChange}>
              <option value="new">New Question</option>
              {this.state.questions.length && this.state.questions.map((question)=>{
                return(
                  <option name={question.content} key={question.id} value={question.id}>{question.content}</option>
                )
              })
              }
            </select>
            <Divider hidden />
            {
              this.state.selectedQuestion==="new"&&
              <Input type="text" id="myText"></Input>
            }
          </div>
            <Divider hidden />

          <div>
            <label>SNIPTS:</label>
            {this.state.currentHighlight.map && this.state.currentHighlight.map((snipt)=>{
              return(
                <List.Item as='a'>
                  <Container text>
                  Snipt: {snipt}
                  <Divider hidden></Divider>
                  <Button>Delete</Button>
                  </Container>
                </List.Item>

              )
            })}
          </div>
          <Divider hidden />
          <Button type = "submit">SAVE</Button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
