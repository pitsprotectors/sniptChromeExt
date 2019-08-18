import React from "react";
import { Container, Paper, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookmarksIcon from "@material-ui/icons/bookmarks";

const useStyles = makeStyles(theme => ({
  questionDisplayContainer: {
    paddingTop: ".5rem",
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
    margin: theme.spacing(2)
  }
}));

const QuestionDisplay = ({ currentQuestion }) => {
  const classes = useStyles();

  return (
    <Container className={classes.questionDisplayContainer}>
      <Container className={classes.questionDisplayContent}>
        <Typography variant="h5" className={classes.questionDisplayLabel}>
          Current Question:
        </Typography>
        <Typography variant="body1">{currentQuestion.content}</Typography>
      </Container>
      <Container className={classes.questionDisplayBookmarksIcon}>
        <Badge
          className={classes.questionDisplayBookmarksIconBadge}
          badgeContent={currentQuestion.snippets.length}
          color="secondary"
        >
          <BookmarksIcon fontSize="large" />
        </Badge>
      </Container>
    </Container>
  );
};

export default QuestionDisplay;
