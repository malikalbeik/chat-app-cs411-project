import React from "react";
import { GRAY } from "../utils/webColors";
import CHAT from "../assets/images/chat.png";
import { makeStyles } from "@mui/styles";

const WebEmptyComponent = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.parent}>
        <img
          alt={"Chat"}
          className={classes.alertIcon}
          src={CHAT}
          loop={true}
        />
        <p style={{ fontSize: 16, color: GRAY, marginTop: 5 }}>{message}</p>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  parent: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    fontFamily: 'Roboto',
    flex: 1,
  },
  alertIcon: {
    height: 60,
    width: 60,
    alignSelf: "center",
    justifyContent: 'center',
    color: GRAY,
    marginBottom: "3%",
    fontFamily: 'Roboto',
    // marginLeft: '15%'
  },
});

export default WebEmptyComponent;
