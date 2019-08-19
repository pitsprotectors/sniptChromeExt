import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Container } from "@material-ui/core";

const CREATE_SNIPPET = gql`
  mutation CreateNewSnippet(
    $questionId: ID!
    $content: String!
    $url: String!
  ) {
    createSnippet(questionId: $questionId, content: $content, url: $url) {
      id
      content
      questionId
    }
  }
`;

const DELETE_SNIPPET = gql`
  mutation DeleteSnippet($id: ID!) {
    deleteSnippet(id: $id)
  }
`;

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
const respondToMouseOver = event => {
  const popupContainer = document.getElementById("snippet-popup-container");
  popupContainer.style.left = `${offset(event.target).left}px`;
  popupContainer.style.top = `${offset(event.target).top + 30}px`;
  popupContainer.classList.add("active");
  popupContainer.title = event.target.id;
};

const respondToMouseOut = event => {
  document.getElementById("snippet-popup-container").classList.remove("active");
};

const resetPopupContainer = () => {
  const popupContainer = document.getElementById("snippet-popup-container");
  popupContainer.style.left = "0px";
  popupContainer.style.top = "0px";
};

const useStyles = makeStyles(theme => ({
  tooltipContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: ".2rem",
    padding: ".2rem"
  },
  deleteIcon: {
    color: "#FFFFFF",
    "&:hover": {
      color: "#e7e7e7"
    }
  }
}));

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   if (changes.newSnippet.newValue)
//     chrome.runtime.sendMessage({ message: "SNIPPETS_REFETCH" });
//   setCurrentQuestionId(changes.questionId.newValue);
// });

const App = () => {
  const classes = useStyles();

  const [currentQuestionId, setCurrentQuestionId] = useState(undefined);
  const [
    createSnippet,
    { createSnippetData, createSnippetLoading, createSnippetError }
  ] = useMutation(CREATE_SNIPPET);
  const [
    deleteSnippet,
    { deleteSnippetData, deleteSnippetLoading, deleteSnippetError }
  ] = useMutation(DELETE_SNIPPET);

  // listening to any changes on the chrome storage
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.questionId) {
      console.log("new change to questionId: ", changes.questionId.newValue);
      setCurrentQuestionId(changes.questionId.newValue);
    }
  });

  const handleDeleteSnippet = () => {
    const deleteSnippetId = document.getElementById("snippet-popup-container")
      .title;
    deleteSnippet({
      variables: { id: deleteSnippetId }
    });
    chrome.runtime.sendMessage({ message: "SNIPPETS_REFETCH" });
    const highlightedSpanToDelete = document.getElementById(deleteSnippetId);
    highlightedSpanToDelete.removeEventListener(
      "mouseover",
      respondToMouseOver
    );
    highlightedSpanToDelete.removeEventListener("mouseout", respondToMouseOut);
    highlightedSpanToDelete.classList.remove(
      "snippet-highlighted-snippet",
      "post-listener"
    );
    resetPopupContainer();
  };

  const getSelectedText = async () => {
    const newSelection = window
      .getSelection()
      .toString()
      .trim();
    if (newSelection.length > 200) return;
    if (newSelection.length) {
      const content = window.getSelection();
      const contentString = content.toString();
      const { data } = await createSnippet({
        variables: {
          questionId: currentQuestionId,
          content: contentString,
          url: "www.google.com"
        }
      });
      const newSnippetId = data.createSnippet.id;
      chrome.runtime.sendMessage({ message: "SNIPPETS_REFETCH" });

      // chrome.storage.sync.set({ newSnippet: true }, function() {
      //   console.log("set new snippet to true");
      // });

      const selection = window
        .getSelection()
        .getRangeAt(0)
        .cloneContents();

      const newSpan = document.createElement("span");
      newSpan.appendChild(selection);

      const highlightedSpan =
        `<span class="snippet-highlighted-snippet pre-listener" id=${newSnippetId}>` +
        newSpan.innerHTML +
        "</span>";
      document.designMode = "on";
      document.execCommand("insertHTML", false, highlightedSpan);
      document.designMode = "off";
      const highlightedSpanWithListener = document.querySelector(
        ".snippet-highlighted-snippet.pre-listener"
      );
      highlightedSpanWithListener.addEventListener(
        "mouseover",
        respondToMouseOver
      );
      highlightedSpanWithListener.addEventListener(
        "mouseout",
        respondToMouseOut
      );
      highlightedSpanWithListener.classList.remove("pre-listener");
      highlightedSpanWithListener.classList.add("post-listener");
    }
  };
  document.onmouseup = getSelectedText;
  return (
    <Container className={classes.tooltipContainer}>
      <DeleteForeverIcon
        className={classes.deleteIcon}
        fontSize="large"
        onClick={handleDeleteSnippet}
      />
    </Container>
  );
};
export default App;
