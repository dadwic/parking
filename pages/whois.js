import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import ReplayIcon from "@material-ui/icons/Replay";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonAppBar from "../src/ButtonAppBar";
import ScrollTop from "../src/ScrollTop";
import ScrollBottom from "../src/ScrollBottom";

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

export default function Whois(props) {
  const classes = useStyles();
  const buttonEl = useRef(null);
  const [data, setData] = useState({});
  const [play, setPlay] = useState(true);
  const [domains, setDomains] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (play) {
      const index =
        Object.keys(data).length === 0 ? 0 : Object.keys(data).length + 1;

      if (index % 10 === 0) {
        // buttonEl.current.click();
        window.scrollBy(0, 300);
      }
      fetchNicData(domains[index]);
    }
  }, [data, play]);

  const fetchNicData = (domain) => {
    axios
      .get(`http://whois.nic.ir/WHOIS?name=${domain}.ir`)
      .then(function (response) {
        // handle success
        const status =
          response.data.search("ERROR:101") === -1 ? "error" : "success";
        setData({
          ...data,
          [domain]: status,
        });
        if (status === "success") {
          localStorage.setItem(`${domain}.ir`, status);
          alert(`${domain}.ir HOORA!!! Yes`);
        }
      })
      .catch(function (error) {
        // handle error
        setData({ ...data, [domain]: "warning" });
        console.log(`domain: ${domain}.ir | error: `, error);
      });
  };

  const fetchMoreData = () => {
    if (domains.length >= 17576) {
      setHasMore(false);
      return;
    }

    axios
      .get(`/domains?limit=50&page=${domains.length / 50 + 1}`)
      .then(function (response) {
        // handle success
        setDomains(domains.concat(response.data));
      })
      .catch(function (error) {
        // handle error
      });
  };

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
          <InfiniteScroll
            dataLength={domains.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Box textAlign="center" py={2}>
                <b>Loading...</b>
              </Box>
            }
            endMessage={
              <Box textAlign="center" py={2}>
                <b>Yay! You have seen it all</b>
              </Box>
            }
          >
            {domains.map((domain, index) => (
              <ListItem
                button
                key={index}
                onClick={() =>
                  window.open(
                    `http://whois.nic.ir/WHOIS?name=${domain}.ir`,
                    "_blank"
                  )
                }
              >
                <ListItemIcon>
                  <Typography>{index + 1}</Typography>
                </ListItemIcon>
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
                    <IconButton
                      edge="end"
                      onClick={() => {
                        // setData({ ...data, [domain]: false });
                        fetchNicData(domain);
                      }}
                    >
                      <ReplayIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
        <div id="back-to-bottom-anchor" />
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <ScrollBottom {...props}>
        <Fab
          color="secondary"
          ref={buttonEl}
          size="small"
          aria-label="scroll back to bottom"
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </ScrollBottom>
    </Box>
  );
}
