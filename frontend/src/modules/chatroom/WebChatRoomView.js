import React, { useState, useRef } from "react";

import ChatRoomLeftItem from "./WebChatRoomLeftItem";
import ChatRoomRightItem from "./WebChatRoomRightItem";
import { webConstants } from "../../utils/webConstants";
import ChatTextInput from "./WebChatTextInput";
import { getUserTypeChatRoom } from "../../utils/webHelperFunctions";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import WhatsapBG from "../../assets/images/WhatsappBG.png";


const ChatRoomView = ({ chatItem, userName, socket, messagesList }) => {
  const [height, setHeight] = useState(80);
  const [sentMessages, setSentMessages] = useState([]);
  const flatList = useRef();
  const inputRef = useRef();

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80,
  });


  const onSendMessage = (text) => {
    if (text !== "") {
      var messageData = JSON.stringify({ "action": "SendMessage", "to": chatItem, "MessageBody": text, "from": userName, "time": Date.now() })
      socket.send(messageData);
      setSentMessages(prevMessages => [...prevMessages, messageData]);
    }
  };

  function modifyRowHeight(event) {
    if (event.target.value !== "") {
      setHeight(inputRef.current.clientHeight);
    } else {
      setTimeout(() => {
        setHeight(inputRef.current.clientHeight);
        flatList.current.measureAllRows();
        flatList.current.scrollToRow(0);
      }, 200);
    }
  }

  const rowRenderer = ({ index, parent, key, style }) => {
    var sortedList = [...messagesList, ...sentMessages].sort((a, b) => JSON.parse(a).time > JSON.parse(b).time ? 1 : -1);
    // console.log("the sorted list is: ");
    // console.log(sortedList)
    var item = sortedList[index];
    let userType = getUserTypeChatRoom(JSON.parse(item), userName);
    if (userType === webConstants.OWNER) {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomRightItem item={item} styleList={style} />
        </CellMeasurer>
      );
    } else {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomLeftItem item={item} styleList={style} />
        </CellMeasurer>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "url(" + WhatsapBG + ")",
        height: "92%",
      }}
    >
      <div
        style={{
          backgroundColor: "#E4DDD6",
          height: "100%",
          zIndex: "100",
          opacity: "0.95",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: "1000",
          height: "92%",
          width: "70%",
        }}
      >
        <List
          ref={flatList}
          style={{
            height: "100%",
            width: "100%",
            outline: "none",
            paddingBottom: height === "" ? 80 : height,
            paddingTop: 10,
          }}
          rowCount={messagesList.length + sentMessages.length}
          height={window.innerHeight - 120}
          width={window.innerWidth - window.innerWidth / 3.2}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={rowRenderer}
          scrollToAlignment={"end"}
          data={[...messagesList, ...sentMessages].sort((a, b) => JSON.parse(a).time > JSON.parse(b).time ? 1 : -1)}
        />
      </div>

      <div
        ref={inputRef}
        style={{
          position: "fixed",
          zIndex: "2000",
          width: "70%",
          marginBottom: 0,
          resize: "vertical",
          bottom: 0,
          maxHeight: 160,
          minHeight: 60,
          overflow: "hidden",
        }}
      >
        <ChatTextInput
          onSendMessage={(text) => onSendMessage(text)}
          onTyping={(event) => {
            modifyRowHeight(event);
          }}
        />
      </div>
    </div>
  );

};

export default ChatRoomView;
