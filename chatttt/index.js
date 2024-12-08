import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database file
const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
    console.log('%c a user connected', "border: 1px solid red;");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('typing message', (name) => {
        io.emit('typing message', name);
    })
    socket.on('chat message', async (msg, name) => {
        let result;
        try {
            // store the message in the database
            result = await db.run('INSERT INTO messages (content, name) VALUES (?, ?)', msg, name);
        } catch (e) {
            // TODO handle the failure
            console.error(e);
            return;
        }
        // include the offset with the message
        io.emit('chat message', msg, name, result.lastID);
    });
    if (!socket.recovered) {
        // if the connection state recovery was not successful
        try {
            await db.each('SELECT id, content, name FROM messages WHERE id > ?',
                [socket.handshake.auth.serverOffset || 0],
                (_err, row) => {
                    socket.emit('chat message', row.content, row.name, row.id);
                }
            )
        } catch (e) {
            // something went wrong
        }
    }
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});