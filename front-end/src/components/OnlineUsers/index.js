import React, { useState, useEffect } from "react";

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
    <div>
      <h3>Online Users:</h3>
      <p>Connected: {filteredUserList.length}</p>
      <ul>
        {filteredUserList.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
