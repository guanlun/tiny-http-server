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

        this.addHeader('Content-Length', data.length);
    }

    getResponseMessage() {
        const statusText = '';

        const headerLines = [];

        for (let key in this.headers) {
            const val = this.headers[key];
            headerLines.push(`${key}: ${val}`);
        }

        const headerText = headerLines.join('\n');

        return `HTTP/1.1 ${this.statusCode} ${statusText}\n${headerText}\n\n${this._body}`;
    }
}
