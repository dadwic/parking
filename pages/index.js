import React from "react";
import orderBy from "lodash.orderby";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ExploreIcon from "@material-ui/icons/Explore";
import StarsIcon from "@material-ui/icons/Stars";
import BlockIcon from "@material-ui/icons/Block";
import { sentenceCase } from "sentence-case";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import domains from "../public/domains.json";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
  card: {
    minWidth: 275,
    backgroundColor: theme.palette.grey[50],
  },
  premium: {
    color: theme.palette.warning.main,
  },
}));

export default function Index(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box my={8}>
        <Typography variant="h2" align="center" color="error" gutterBottom>
          For sale
        </Typography>
        <Typography
          variant="h1"
          align="center"
          style={{ fontWeight: "bold" }}
          gutterBottom
        >
          {sentenceCase(props.host, { delimiter: "." })}
        </Typography>
        <ProTip />
        <Typography variant="h5" color="textSecondary" gutterBottom>
          All domains ({domains.length})
        </Typography>
        <Divider variant="inset" />
        <Grid container spacing={1} justify="center" className={classes.root}>
          {orderBy(domains, "domain", "asc").map((d, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography variant="h5">{d.domain}</Typography>
                </CardContent>
                <CardActions>
                  {d.premium && (
                    <Tooltip title="Premium" placement="top">
                      <StarsIcon className={classes.premium} />
                    </Tooltip>
                  )}
                  {d.blocked && (
                    <Tooltip title="Not for sale" placement="top">
                      <BlockIcon color="error" />
                    </Tooltip>
                  )}
                  <IconButton
                    size="small"
                    target="_blank"
                    href={`http://${d.domain}`}
                  >
                    <ExploreIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  return {
    props: context.req.headers,
  };
}
