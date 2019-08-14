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
      projects: []
    };
    this.syncStorageToState = this.syncStorageToState.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  syncStorageToState() {
    console.log("sync storage to state was called");
    chrome.storage.sync.get(stored => {
      this.setState({ currentHighlight: stored.content });
    });
  }

  async handleSave() {
    //send the currentHighlight on the state to the database
    const CREATE_SNIPPET = gql`
    mutation{
      createSnippet(questionId: ${1}, content: "${
      this.state.currentHighlight
    }", url: "www.google.com"){
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
      // form.addEventListener("submit", function(e) {
      //   e.preventDefault();
      //   let value = e.target.children.code.value;
      //   console.log(code);
      // });
      false
    );
  }

  render() {
    return (
      <div>
        <h2>Hello Extension</h2>
        <h4>Question: How do I make this extension work?</h4>
        <div>Snippet: {this.state.currentHighlight}</div>
        <button onClick={this.handleSave} style={{ marginTop: "1rem" }}>
          Save
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
