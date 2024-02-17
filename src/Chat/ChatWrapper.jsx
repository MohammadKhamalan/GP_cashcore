import { ChatFeed, MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';
import { AuthContext } from "../Context/Context";
import { useContext } from "react";
import React from 'react';
// import "./Chat.scss";

const ChatWrapper = (props) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return null;
  }

  const chatProps = useMultiChatLogic(
    'e7814771-958a-4b64-89f9-3a07251da380',
    currentUser.employee_name,
    currentUser.employee_name
  );

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MultiChatSocket {...chatProps}  />
      <MultiChatWindow {...chatProps} style={{ height: '100%', marginTop: '-76%', marginLeft: '18%', color: 'blue', backgroundColor: 'lightblue' }} />
    </div>
  );
}

export default ChatWrapper;
