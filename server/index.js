import { createServer } from 'http';
import { Server } from 'socket.io';
import { spawnSync } from 'child_process';

const httpServer = createServer();
const portNumber = 3500;

const io = new Server(httpServer, {
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

httpServer.listen(portNumber, () => {
    console.log(`Server listening on port ${portNumber}`);
});

async function openairesponse (data) {
    const response = spawnSync('python', ['../inference/fn.py', '-f', '../database/data.json', '-m', data]).stdout.toString();
    // wait for two seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    // const response = 'ok';
    // console.log(response.length);
    console.log(`response: ${response}`);
    // 
    return `${response}`;
}