import net from 'net';
import fs from 'fs';

import {MiddlewareManager} from './middleware-manager';

const host = 'localhost';
const port = '8000';

net.createServer((socket) => {
    socket.on('data', (data) => {
        const middlewareManger = new MiddlewareManager(data);

        middlewareManger.process((response) => {
            const resContent = response.getResponseContent();
            socket.write(resContent);

            socket.end();
        });
    });
}).listen(port);
