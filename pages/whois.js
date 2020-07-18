import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import ReplayIcon from "@material-ui/icons/Replay";
import domains from "../src/domains";
import ButtonAppBar from "../src/ButtonAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
  },
  list: {
    width: "100%",
    maxWidth: 360,
    margin: `64px auto 0`,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Whois() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [play, setPlay] = useState(true);

  useEffect(() => {
    if (play) {
      const index =
        Object.keys(data).length === 0 ? 0 : Object.keys(data).length + 1;
      axios
        .get(`http://whois.nic.ir/WHOIS?name=${domains[index]}.ir`)
        .then(function (response) {
          // handle success
          setData({
            ...data,
            [domains[index]]:
              response.data.search("ERROR:101") === -1 ? "error" : "success",
          });
        })
        .catch(function (error) {
          // handle error
          setData({ ...data, [domains[index]]: "warning" });
        });
    }
  }, [data, play]);

  return (
    <Box className={classes.root}>
      <Head>
        <title>Domain Name Search</title>
      </Head>
      <ButtonAppBar
        play={play}
        setPlay={setPlay}
        title={`${domains.length} domains / ${
          Object.keys(data).length
        } checked`}
      />
      <div className={classes.list}>
        <List dense>
          {domains.map((domain, key) => (
            <ListItem
              button
              key={key}
              onClick={() =>
                window.open(
                  `http://whois.nic.ir/WHOIS?name=${domain}.ir`,
                  "_blank"
                )
              }
            >
              <ListItemIcon>
                {!data[domain] && <QueryBuilderIcon color="action" />}
                {data[domain] === "success" && (
                  <CheckCircleIcon style={{ color: "#28a745" }} />
                )}
                {data[domain] === "error" && <ErrorIcon color="error" />}
                {data[domain] === "warning" && (
                  <WarningIcon style={{ color: "#ffc107" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={`${domain}.ir`} />
              {data[domain] === "warning" && (
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <ReplayIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
}
