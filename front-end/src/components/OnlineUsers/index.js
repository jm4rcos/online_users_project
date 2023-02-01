import React, { useState, useEffect } from "react";
import './styles.css'

function OnlineUsers(props) {
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3333");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "newUser",
          username: props.username,
          pageID: props.pageID,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setConnectedUsers(data.connectedUsers);
      setUserList(data.userList);
    };

    return () => {
      ws.close();
    };
  }, [props.username, props.pageID]);

  const filteredUserList = userList.filter(
    (user) => user.pageID === props.pageID
  );

  return (
    <div className="online-users-container">
      <p className="connected-users">Connected: {filteredUserList.length}</p>
      <h3 className="online-users-header">Online Users:</h3>
      <ul className="user-list">
        {filteredUserList.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
