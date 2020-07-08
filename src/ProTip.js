import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import LanguageIcon from "@material-ui/icons/Language";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
}));

export default function ProTip() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color="textSecondary" align="center" gutterBottom>
        For buy this domain please contact me
      </Typography>
      <Tooltip title="Visit Website">
        <IconButton
          color="default"
          title="Website"
          target="_blank"
          rel="noopener"
          href="http://dadwic.com/"
        >
          <LanguageIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Call">
        <IconButton color="default" title="Phone" href="tel:+989390219753">
          <CallIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Send Email">
        <IconButton
          color="default"
          title="Email"
          href="mailto:dadwic0@gmail.com"
        >
          <EmailIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="WhatsApp Chat">
        <IconButton
          color="default"
          title="WhatsApp"
          target="_blank"
          rel="noopener"
          href="https://wa.me/989390219753?text=BuyDomain"
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Instagram Page">
        <IconButton
          color="default"
          title="Instagram"
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/dadwic/"
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn Profile">
        <IconButton
          color="default"
          title="LinkedIn"
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/dadwic/"
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
