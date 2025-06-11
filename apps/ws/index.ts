import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import {client} from 'db/client'


const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    await client.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    });

    ws.send(message.toString());
  });
});

server.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
