export class TinyHttpResponse {
    constructor() {
        this.headers = {};
    }

    status(code) {
        this.statusCode = code;
    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    getBody() {
        return this._body;
    }

    setBody(data) {
        this._body = data;
        this._bodyLength = data.length;

        this.addHeader('Content-Length', this._bodyLength);
    }

    getHeaderText() {
        const statusText = '';

        const headerLines = [];

        for (let key in this.headers) {
            const val = this.headers[key];
            headerLines.push(`${key}: ${val}`);
        }

        return `HTTP/1.1 ${this.statusCode} ${statusText}\n${headerLines.join('\n')}\n\n`;
    }

    getResponseContent() {
        const text = this.getHeaderText();

        const buffer = new Buffer(text.length, 'ascii');
        buffer.write(text);

        const responseBuffer = Buffer.concat([buffer, this._body]);

        return responseBuffer;
    }
}
