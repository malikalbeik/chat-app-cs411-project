import React from "react";
import ChatRoomView from "./WebChatRoomView";
import WebChatRoomHeaderView from "./WebChatRoomHeaderView";


const WebChatRoomScreen = ({ route, userName, socket, messages }) => {
  return (
    <div style={styles.parentView}>
      <WebChatRoomHeaderView item={route} />
      <ChatRoomView chatItem={route} userName={userName} socket={socket} messagesList={messages.filter(msg => JSON.parse(msg).from === route)} />
    </div>
  );
};

export default WebChatRoomScreen;

const styles = {
  parentView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4DDD6"
  }
};
