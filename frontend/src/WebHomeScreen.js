import React, { useState, useEffect } from "react";
import {
    APP_BG_COLOR,
    LIGHT_GREEN,
} from "./utils/webColors";
import WebChatListView from "./modules/chatlist/WebChatListView";
import WebChatRoomScreen from "./modules/chatroom/WebChatRoomScreen";
import { Divider } from "@mui/material";
import WebEmptyRoomComponent from "./components/WebEmptyRoomComponent";
import WebChatListHeader from "./modules/chatlist/WebChatListHeader";
import { getSocketNew } from "./utils/webHelperFunctions";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

var socket = getSocketNew();

const WebHomeScreen = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const [userName, setUserName] = useState("");

    const [refresh, setRefresh] = useState(false);
    const [openSetName, setOpenSetName] = useState(false);
    const [openNewChat, setOpenNewChat] = useState(false);
    const [newChatUserName, setNewChatUserName] = useState("")
    const [userChatList, setUserChatList] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setOpenSetName(true);
    }, []);


    function onListItemClick(data) {
        setSelectedItem(data);
        resetState();
    }

    function resetState() {
        setRefresh(!refresh);
    }

    const handleSetNameClose = () => {
        setOpenSetName(false);
        socket.send(JSON.stringify({ action: "SetName", Name: userName }));
        socket.addEventListener("message", (message) => {
            setMessages(oldMessages => [...oldMessages, message.data]);
            var newUser = JSON.parse(message.data).from
            console.log("the new user is: " + newUser + " the list is: " + userChatList)
            setUserChatList((prevList) => {
                if (!prevList.includes(newUser)) {
                    return [...prevList, newUser]
                }
                else {
                    return prevList
                }
            })
        })
    };
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleNewChatClick = () => {
        setOpenNewChat(true);
    }
    const handleNewChatClose = () => {
        setOpenNewChat(false);
    }

    const handleNewChatUserNameChange = (event) => {
        setNewChatUserName(event.target.value);
    }

    const handleNewChatSubmit = () => {
        setOpenNewChat(false);
        setUserChatList((prevList) => [...prevList, newChatUserName])
        console.log("updated the chat list, new chat list is: " + userChatList)
        setNewChatUserName("");
    }

    return (
        <div>
            <div style={styles.parentView}>

                <Dialog open={openNewChat} onClose={handleNewChatClose}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the name that you want to use in the chat
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            onChange={handleNewChatUserNameChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNewChatSubmit}>Sign in</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openSetName} onClose={handleSetNameClose}>
                    <DialogTitle>Sign in</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the name that you want to use in the chat
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            onChange={handleUserNameChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSetNameClose}>Sign in</Button>
                    </DialogActions>
                </Dialog>

                <div style={styles.paperView} elevation={5}>
                    <div style={styles.leftDivStyle}>
                        <WebChatListHeader
                            onChatAdd={handleNewChatClick}
                        />
                        <Divider style={{ height: 0.6 }} />
                        <WebChatListView
                            onItemClick={onListItemClick}
                            userChatList={userChatList}
                        />
                    </div>
                    <Divider style={styles.dividerStyle} />
                </div>

                <div style={styles.roomDivStyle}>
                    {selectedItem === "" && (
                        <WebEmptyRoomComponent />
                    )}
                    {selectedItem !== "" && <WebChatRoomScreen route={selectedItem} userName={userName} socket={socket} messages={messages} />}
                </div>

            </div>
        </div>
    );
};

export default WebHomeScreen;

const styles = {
    parentView: {
        backgroundColor: APP_BG_COLOR,
        height: window.innerHeight,
        width: window.innerWidth,
        flex: 1,
        display: "flex",
        overflow: "hidden",
        margin: -8
    },
    paperView: {
        flex: 0.3,
        display: "flex",
        flexDirection: "row",
        borderWidth: 0,
    },
    dividerStyle: {
        flex: 0.7,
        display: "flex",
        marginLeft: 0,
        backgroundColor: LIGHT_GREEN,
    },
    roomDivStyle: {
        flex: 0.7,
        display: "flex",
        marginLeft: 0,
        backgroundColor: LIGHT_GREEN,
    },
    leftDivStyle: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }
};
