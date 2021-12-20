import React from "react";
import {
  TEXT_TITLE,
  HEADER_COLOR,
} from "../../utils/webColors";
import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import chatImage from "../../assets/svg/chatImage.svg";


const WebChatRoomHeaderView = ({ item }) => {

  let styles = useStyles();

  return (
    <div className={styles.parentView} elevation={5}>
      <div
        style={{
          width: "5%",
          marginLeft: "1%",
          alignSelf: "center",
          marginTop: "0.2%",
        }}
      >
        <Avatar src={chatImage} className={styles.profileIcon} />
      </div>
      <div
        style={{
          display: "flex",
          width: "76%",
          flexDirection: "column",
          marginLeft: "1%",
          alignSelf: "center",
        }}
      >
        <Typography className={styles.userName}>{item}</Typography>
      </div>
    </div>
  );
};

export default WebChatRoomHeaderView;

const useStyles = makeStyles(() => ({
  parentView: {
    backgroundColor: HEADER_COLOR,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "1%",
    borderRadius: 0,
    marginLeft: 0.05,
  },
  profileIcon: {
    alignSelf: "center",
    justifySelf: "center",
  },
  userName: {
    fontSize: 16,
    color: TEXT_TITLE,
  },
}));
