import net from 'net';
import fs from 'fs';

import {TinyHttpRequest} from './tiny-http-request';
import {TinyHttpResponse} from './tiny-http-response';

import {MiddlewareManager} from './middleware-manager';

const host = 'localhost';
const port = '8000';

net.createServer((socket) => {
    socket.on('data', (data) => {
        handleHttpRequest(data);

        socket.write('ok');
    });
}).listen(port);

var handleHttpRequest = (data) => {
    const request = new TinyHttpRequest(data);
    const response = new TinyHttpResponse();

    const middlewareManger = new MiddlewareManager(request, response);

    if (request.method !== 'GET') {

    }

    if (!fs.existsSync(request.path)) {

    }
}

var methodProcessor = (req, res, next) => {
}

var cacheProcessoror = (req, res, next) => {
}
