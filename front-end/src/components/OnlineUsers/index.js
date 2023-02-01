import React, { useState, useEffect } from "react";

const OnlineUsers = (props) => {
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [userList, setUserList] = useState([]);

  console.log("props: ", props.username);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3333");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "username",
          username: props.username,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "connectedUsers") {
        setConnectedUsers(data.connectedUsers);
        setUserList(data.userList);
      }
    };

    return () => {
      socket.close();
    };
  }, [props.username]);

  const user = Object.values(props.username)[0];
  console.log(props.username, user);

  return (
    <div style={{ background: "lightgreen", padding: "5px" }}>
      <h2>Usuários conectados</h2>
      <h3>{user.length !== 0 && user}</h3>
      <p>Quantidade: {connectedUsers}</p>
      <ul>
        {userList.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
