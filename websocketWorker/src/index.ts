import express from "express";
import { createClient } from "redis";
import { WebSocketServer } from 'ws';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

const clients = new Map(); 

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data:any) {
    
    const { id } = JSON.parse(data); 
    clients.set(id, ws); 
    console.log(`Received submission ID ${id}`);
  });

  ws.send('Hello! Message From Server!!');
});

client.connect().then(() => {
  console.log("Connected to Redis.");

  client.subscribe("results", (message) => {
    const result = JSON.parse(message);
    const { id } = result;
    const ws = clients.get(id); 

    if (ws) {
      ws.send(JSON.stringify(result)); 
    }
  });
});
