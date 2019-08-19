import React from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { Container, Paper, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookmarksIcon from "@material-ui/icons/bookmarks";

const useStyles = makeStyles(theme => ({
  questionDisplayContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  questionDisplayContent: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    paddingLeft: "1rem"
  },
  questionDisplayLabel: {
    marginBottom: ".2rem"
  },
  questionDisplayBookmarksIcon: {
    width: "4rem",
    padding: 0
  },
  questionDisplayBookmarksIconBadge: {
    margin: 0
  },
  questionDisplayQuestionContent: {
    fontSize: "12px"
  }
}));

const GET_QUESTION = gql`
  query getQuestion($id: ID!) {
    question(id: $id) {
      id
      content
      snippets {
        id
        content
      }
    }
  }
`;

const QuestionDisplay = ({ currentQuestion, setCurrentQuestion }) => {
  const classes = useStyles();

  const [getQuestion, { loading, data, refetch }] = useLazyQuery(GET_QUESTION);

  if (data && data.question) {
    setCurrentQuestion(data.question);
  }

  // listen to messages from popup.js
  chrome.runtime.onMessage.addListener(receiver);

  // receiving message from popup on start to activate iframe
  async function receiver(request, sender, sendResponse) {
    if (request.message === "SNIPPETS_REFETCH") {
      console.log("refetch message received");
      currentQuestion.id &&
        (await getQuestion({
          variables: { id: currentQuestion.id }
        }));
      refetch && refetch();
    }
  }

  return (
    <Container className={classes.questionDisplayContainer}>
      <Container className={classes.questionDisplayContent}>
        <Typography variant="h6" className={classes.questionDisplayLabel}>
          Current Question:
        </Typography>
        <Typography
          variant="body1"
          className={classes.questionDisplayQuestionContent}
        >
          {currentQuestion.content}
        </Typography>
      </Container>
      <Container className={classes.questionDisplayBookmarksIcon}>
        <Badge
          className={classes.questionDisplayBookmarksIconBadge}
          badgeContent={
            !currentQuestion.id ? 0 : currentQuestion.snippets.length
          }
          color="secondary"
        >
          <BookmarksIcon fontSize="large" />
        </Badge>
      </Container>
    </Container>
  );
};

export default QuestionDisplay;
