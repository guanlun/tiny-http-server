const ROOT_PATH = './static';

export class TinyHttpRequest {
    constructor (requestData) {
        const requestBody = requestData.toString().split('\r\n');
        const initialRequestLine = requestBody[0];
        const initialLineSegs = initialRequestLine.split(' ');

        this.method = initialLineSegs[0];
        this.path = ROOT_PATH + initialLineSegs[1];
        this.headers = {};

        const headerLines = requestBody.slice(1);
        for (let line of headerLines) {
            if (line === '') {
                continue;
            }

            const segs = line.split(': ');

            this.headers[segs[0]] = segs[1];
        }
    }
}
