import React from "react";
import { MENU_GRAY } from "../utils/webColors";

const WebEmptyRoomComponent = () => {

  return (
    <div
      style={{
        backgroundColor: "#F8F9FB",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: -15,
      }}
    >
      <div
        style={{
          backgroundColor: "#F8F9FB",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: -15,
        }}
      >
        <h1
          style={{
            color: "#525252",
            marginTop: 5,
            fontWeight: "normal",
            marginBottom: 0,
            fontFamily: 'roboto'
          }}
        >
          Welcome to our Messaging App
        </h1>
        <div>
          <p
            style={{
              textAlign: "center",
              color: MENU_GRAY,
              fontSize: 14,
              lineHeight: 1.5,
              fontFamily: 'Roboto'
            }}
          >
            Select a chat or create a new one to chat with friends
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebEmptyRoomComponent;
