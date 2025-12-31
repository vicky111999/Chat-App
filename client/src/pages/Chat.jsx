import React, { useEffect, useState } from "react";
import api from "../api/Axios";
import socket from "../socket/Socket";
import Chatlayout from "../components/Chatlayout";
import Chatwindow from "../components/Chatwindow";
import Siderbar from "../components/Siderbar";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectuser, setSelectuser] = useState(null);
  const [messages, setmessages] = useState([]);
  
  
  const {user} = useAuth()
  

  useEffect(() => {
    if (!user) return <Navigate to="/" replace/>;
    api
      .get(`/api/auth/list`)
      .then((res) => setUsers(res.data.message))
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  useEffect(() => {
    if (!selectuser) return;
    console.log(selectuser)
    api
      .get(`/api/auth/chat/${selectuser._id}`)
      .then((res) => setmessages(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, [selectuser]);


  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ socket error", err.message);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("receivemessage", (msg) => {
      if (selectuser && msg.sender === selectuser._id) {
        setmessages((prev) => [...prev, msg]);
      
      }
    });
    return () => socket.off("receivemessage");
  }, [selectuser]);
  console.log(messages)

  const sendMessage = async (text) => {
    if (!text || !selectuser) return;

    socket.emit("privatemessage", { receiver: selectuser._id, text });
    setmessages((prev) => [...prev, { text, fromMe: true }]);
  };
  
  return (
    <>
      {" "}
      <Chatlayout
        selectuser={selectuser}
        sidebar={
          <Siderbar
            users={users}
            activeUser={selectuser}
            onSelect={setSelectuser}
          
          />
        }
        main={
          <Chatwindow
            user={selectuser}
            messages={messages}
            onSend={sendMessage}
            onBack={() => setSelectuser(null)}
          />
        }
      />
    </>
  );
};

export default Chat;
