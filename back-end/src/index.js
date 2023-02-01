const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connectedUsers = 0;
let userList = [];

wss.on("connection", (ws) => {
  let username;
  let pageID;
  connectedUsers += 1;

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    username = data.username;
    pageID = data.pageID;

    if (!userList.find((user) => user.username === username)) {
      userList.push({ username, pageID });
    } else {
      userList = userList.map((user) => {
        if (user.username === username) {
          user.pageID = pageID;
        }
        return user;
      });
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
    userList = userList.filter((user) => user.username !== username);

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
