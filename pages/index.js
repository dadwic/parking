import React from "react";
import orderBy from "lodash.orderby";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { sentenceCase } from "sentence-case";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import domains from "../public/domains.json";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

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
        <Grid container spacing={1} justify="center">
          {orderBy(domains, "domain", "asc").map((d, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h4">
                    {sentenceCase(d.domain, { delimiter: "." })}
                  </Typography>
                </CardContent>
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
