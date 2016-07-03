import net from 'net';
import fs from 'fs';

import {MiddlewareManager} from './middleware-manager';

const host = 'localhost';
const port = '8000';

net.createServer((socket) => {
    socket.on('data', (data) => {
        const middlewareManger = new MiddlewareManager(data);

        middlewareManger.process((response) => {
            const resMessage = response.getResponseMessage();
            socket.write(resMessage);

            socket.end();
        });
    });
}).listen(port);
