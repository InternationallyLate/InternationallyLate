import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { spawnSync } from 'child_process';


const app = express();
const portNumber = process.env.PORT || 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticOptions = {
    index: 'chatbot.html',
};

app.use(express.static(
    path.join(__dirname, 'public'),
    staticOptions,
));

const expressServer = app.listen(portNumber, () => {
    console.log(`Server listening on port ${portNumber}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://127.0.0.1:5500'],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('message', async (data) => {
        console.log(data);
        const response = await openairesponse(data)
        console.log(response);
        io.emit('message', `${response}`);
        // io.emit('message', "GenAI response");
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

async function openairesponse (data) {
    let response = spawnSync('python', ['../inference/fn.py', '-f', '../inference/data.json', '-m', data]);
    // wait for two seconds
    console.log(response.stdout.toString());
    console.log(response.stderr.toString());
    response = response.stdout.toString();

    await new Promise(resolve => setTimeout(resolve, 2000));
    // const response = 'ok';
    // console.log(response.length);
    console.log(`response: ${response}`);
    // 
    return `${response}`;
}