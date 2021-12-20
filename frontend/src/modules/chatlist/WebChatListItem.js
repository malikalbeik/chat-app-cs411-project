import React from "react";
import {
  GRAY,
  WHITE,
  LIGHT_GREEN,
  LIGHT_GRAY_0
} from "../../utils/webColors";
import { makeStyles } from "@mui/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@mui/material";
import chatImage from "../../assets/svg/chatImage.svg";

const WebChatListItem = ({ item, position, onItemClick }) => {
  const classes = useStyles();



  return (
    <div style={{ cursor: 'pointer' }} onClick={() => onItemClick(item)}>
      {position > 0 && (
        <div
          light={true}
          className={classes.parentDiv}
        />
      )}
      <ListItem
        alignItems="flex-start"
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginTop: "-1%"
        }}
      >
        <ListItemAvatar style={{ flex: 0.15, marginLeft: "-1%" }}>
          {/* <chatImage /> */}
          <Avatar alt="User" src={chatImage} className={classes.profileImage} />
        </ListItemAvatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.7
          }}
        >
          <ListItemText
            primary={
              <Typography className={classes.userName}>
                {item}
              </Typography>
            }
          />
        </div>
      </ListItem>
    </div>
  );
};

export default WebChatListItem;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    fontFamily: 'Roboto'
  },
  parentDiv: {
    height: 0.3,
    backgroundColor: LIGHT_GRAY_0,
    maxWidth: "83%",
    width: "100%",
    right: 0,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    flexDirection: "row",
    display: "flex",
    marginLeft: "auto",
    marginRight: 0,
    fontFamily: 'Roboto'
  },
  inline: {
    display: "inline"
  },
  profileImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginLeft: "-5%"
  },
  userName: {
    fontSize: 16,
    marginTop: 6
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: -8,
    width: 280,
    // flex: 0.3,
    alignSelf: "flex-start",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontFamily: 'Roboto'
  },
  userTime: {
    fontSize: 12,
    marginTop: 6,
    color: GRAY,
    alignSelf: "flex-end"
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-end",
    marginRight: -10
  },
  textMsgCountView: {
    fontSize: 12,
    color: WHITE,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 10
  },
  avatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: LIGHT_GREEN
  },
  emptyAvatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: WHITE
  },
  textMsgCount: {
    fontSize: 10,
    color: WHITE,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  }
}));
