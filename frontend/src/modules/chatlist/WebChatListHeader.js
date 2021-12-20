import React from "react";
import {
  GRAY,
  TEXT_TITLE,
  HEADER_COLOR,
  MENU_GRAY
} from "../../utils/webColors";
import { Avatar } from '@mui/material';
import { Add } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";

const WebChatListHeader = ({ onChatAdd }) => {
  const styles = useStyles();

  return (
    <div className={styles.parentView}>
      <div style={{ width: "20%", marginLeft: "4%", alignSelf: "center" }}>
        <Avatar className={styles.profileIcon} />
      </div>
      <div
        style={{
          width: "60%",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      />
      <div
        style={{
          width: "20%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Add onClick={onChatAdd} className={styles.chatIcons} />
      </div>
    </div>
  );
};

export default WebChatListHeader;

const useStyles = makeStyles(theme => ({
  parentView: {
    backgroundColor: HEADER_COLOR,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: 0
  },
  backIcon: {
    justifyContent: "center",
    height: "100%",
    alignSelf: "center",
    color: TEXT_TITLE
  },
  profileIcon: {
    width: 40,
    height: 40,
    alignSelf: "center"
  },
  userName: {
    fontSize: 16,
    color: TEXT_TITLE
  },
  userMessage: {
    fontSize: 12,
    color: GRAY
  },
  menuIcons: {
    width: 24,
    height: 24,
    color: MENU_GRAY,
    marginLeft: "15%",
    alignSelf: "center",
    cursor: 'pointer'
  },
  chatIcons: {
    width: 22,
    height: 22,
    color: MENU_GRAY,
    marginLeft: "15%",
    alignSelf: "center",
    cursor: 'pointer'
  }
}));
