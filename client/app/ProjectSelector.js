import React, { Fragment, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "@material-ui/icons/book";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: ".5rem"
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    height: "5rem",
    width: "100%",
    borderRadius: "3rem"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  fab: {
    margin: theme.spacing(1)
  },
  bookIconButton: {
    width: "4rem",
    height: "4rem",
    marginLeft: "1rem",
    marginTop: ".5rem"
  },
  bookIconSvg: {
    color: "#000000",
    padding: 0
  }
}));

const ProjectSelector = ({ setCurrentProject, projectList }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectProject(project) {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.bookIconButton}
      >
        <BookIcon fontSize="large" className={classes.bookIconSvg} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 60,
            width: 200
          }
        }}
      >
        {projectList &&
          projectList.map(project => (
            <MenuItem
              key={project.id}
              onClick={() => {
                handleSelectProject(project);
              }}
            >
              {project.name}
            </MenuItem>
          ))}
      </Menu>
    </Fragment>
  );
};

export default ProjectSelector;
