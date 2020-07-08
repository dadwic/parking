import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";

export default function Index(props) {
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
          {props.host}
        </Typography>
        <ProTip />
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
