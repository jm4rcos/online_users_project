const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3333 });

let clients = new Map();

server.on("connection", (ws, req) => {
  const user = req.headers["sec-websocket-protocol"];

  console.log(user);

  clients.set(user, ws);
  console.log(
    `Novo cliente conectado: "${user}", total de usuários online: ${clients.size}`
  );
  console.log(
    `Novo cliente conectado: ${user}, total de usuários online: ${clients.size}`
  );

  ws.send(`Bem-vindo ${user}! Total de usuários online: ${clients.size}`);
  broadcast(
    `Novo usuário ${user} conectado, total de usuários online: ${clients.size}`
  );

  ws.on("close", () => {
    clients.delete(user);
    console.log(
      `Cliente desconectado: ${user}, total de usuários online: ${clients.size}`
    );
    broadcast(
      `Usuário ${user} desconectado, total de usuários online: ${clients.size}`
    );
  });
});

const broadcast = (message) => {
  clients.forEach((ws) => ws.send(message));
};
