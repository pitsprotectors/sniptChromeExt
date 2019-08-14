import React, { Component } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import "babel-polyfill";

const GET_PROJECTS = gql`
  query {
    user(id: 1) {
      projects {
        name
        id
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentHighlight: "",
      projects: [],
      selectedProject: "General"
    };
    this.syncStorageToState = this.syncStorageToState.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onSelect= this.onSelect.bind(this)
  }

  syncStorageToState() {
    console.log("sync storage to state was called");
    chrome.storage.sync.get(stored => {
      this.setState({ currentHighlight: stored.content });
    });
  }

  async handleSave(event) {
    //send the currentHighlight on the state to the database
    event.preventDefault()
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
    const newQuestionId= +RES.data.createQuestion.id
    const CREATE_SNIPPET = gql`
      mutation{
        createSnippet(questionId: ${newQuestionId}, content: "${this.state.currentHighlight}", url: "www.google.com"){
          id
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: CREATE_SNIPPET
    });
    this.setState({ currentHighlight: "" });
  }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_PROJECTS
    });
    this.setState({
      projects: data.user.projects
    });
    document.addEventListener(
      "DOMContentLoaded",
      this.syncStorageToState(),
      false
    );
  }

  onSelect(event){
    event.preventDefault();
    console.log("are we here", event.target.value)
    this.setState({selectedProject: event.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSave}>
          <label>Project</label>
          <select onChange={this.onSelect}>
            <option>CHOOOOOSES SOMTHINGELSE</option>
            {this.state.projects.length && this.state.projects.map((project)=>{
              return <option name={project.name} key={project.id} value={project.id}>{project.name}</option>
            })}
          </select>
          <div>
            <label>Question:</label>
            <input type="text" id="myText"></input>
          </div>
          <div>
            <label>Snipt:</label>
            <p>{this.state.currentHighlight}</p>
          </div>
          <button type = "submit">SAVE</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));

// onSelect={(event)=>{event.preventDefault(); 
//   this.setState({selectedProject: event.target.key})
//   console.log(this.state)
//   }}
