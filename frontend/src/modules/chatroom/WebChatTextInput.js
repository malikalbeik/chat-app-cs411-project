import React, { useState } from "react";
import {
  WHITE,
  TEXT_TITLE,
  MENU_GRAY,
  HEADER_COLOR
} from "../../utils/webColors";
import {
  Avatar,
  TextareaAutosize
} from "@mui/material";

const ChatTextInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSendMessage(message);
      setMessage("");
    }
  }

  return (
    <div style={styles.parentView}>
      <TextareaAutosize
        style={styles.userMessage}
        placeholder="Type a message ..."
        value={message}
        onKeyPress={e => handleKeyDown(e)}
        onChange={event => {
          onTyping(event);
          setMessage(event.target.value);
        }}
      />
      <div style={styles.sendIconView}>
        <Avatar
          style={{
            backgroundColor: HEADER_COLOR
          }}
        >
        </Avatar>
      </div>
    </div>
  );
};

export default ChatTextInput;

const styles = {
  parentView: {
    backgroundColor: HEADER_COLOR,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row"
  },
  sendIcon: {
    color: MENU_GRAY,
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  sendIconView: {
    flex: 0.05,
    paddingLeft: 10,
    backgroundColor: HEADER_COLOR,
    justifyContent: "center",
    alignSelf: "center"
  },
  userName: {
    fontSize: 16,
    color: WHITE,
    fontWeight: "bold"
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: TEXT_TITLE,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: HEADER_COLOR,
    outline: "none"
  },
  menuIcons: {
    width: 30,
    height: 30,
    color: MENU_GRAY,
    alignSelf: "center"
  },
  smileView: {
    flex: 0.05,
    paddingLeft: 15,
    alignSelf: "center",
    backgroundColor: HEADER_COLOR,
    justifyContent: "center"
  }
};
