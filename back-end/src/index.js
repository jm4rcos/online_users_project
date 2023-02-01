const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connectedUsers = 0;
let userList = [];
let username;

wss.on("connection", (ws) => {
  // connectedUsers += 1;

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    username = data.username;
    console.log(data);

    if (!userList.includes(username)) {
      userList.push(username);
      connectedUsers += 1;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedUsers",
            connectedUsers,
            userList,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    connectedUsers -= 1;
    userList = userList.filter((user) => user !== username);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "connectedUsers",
            connectedUsers,
            userList,
          })
        );
      }
    });
  });
});

server.listen(3333, () => {
  console.log("Servidor iniciado na porta 3333");
});
