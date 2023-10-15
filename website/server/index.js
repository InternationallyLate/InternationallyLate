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
    let response = spawnSync('python', ['../../inference/fn.py', '-f', '../../prob_model/data.json', '-m', data]);
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