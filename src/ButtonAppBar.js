import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} id="back-to-top-anchor">
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            disabled={props.play}
            className={classes.menuButton}
            onClick={() => props.setPlay(true)}
          >
            <PlayIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            disabled={!props.play}
            className={classes.menuButton}
            onClick={() => props.setPlay(false)}
          >
            <StopIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
