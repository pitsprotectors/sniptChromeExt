import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentHighlight: ""
    };
    this.syncStorageToState = this.syncStorageToState.bind(this);
  }

  syncStorageToState() {
    console.log("sync storage to state was called");
    chrome.storage.sync.get(stored => {
      this.setState({ currentHighlight: stored.content });
    });
  }

  handleSave() {
    //send the currentHighlight on the state to the database
  }

  componentDidMount() {
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
        <h4>Question: How do I make this damn extension work?</h4>
        <div>Snippet: {this.state.currentHighlight}</div>
        <button onClick={this.handleSave} style={{ marginTop: "1rem" }}>
          Save
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
