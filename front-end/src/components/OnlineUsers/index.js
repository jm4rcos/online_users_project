import React, { useState, useEffect } from "react";

const useWebSocket = (url, user) => {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");
  console.log(user);

  useEffect(() => {
    const ws = new WebSocket(url, user, {
      headers: {
        "Sec-WebSocket-Protocol": user,
      },
    });
    ws.onopen = () => {
      console.log("WebSocket conectado");
      ws.send(user);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setClients(data.clients);
      setMessage(data.message);
    };
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, [url, user]);

  return { clients, message };
};

const OnlineUsers = ({ username }) => {
  // O username é uma propriedade atribuida pelo componente App
  const user = Object.values(username)[0];
  const { clients, message } = useWebSocket(`ws://localhost:3333`, user);
  return (
    <div>
      <p>{message}</p>
      <p>Usuários online: {clients.length}</p>
      <p>Usuários: {clients.join(", ")}</p>
    </div>
  );
};

export default OnlineUsers;
