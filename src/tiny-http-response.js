import _ from 'lodash';

export class TinyHttpResponse {
    constructor() {
        this.headers = {};
    }

    status(code) {
        this.statusCode = code;
    }

    body(data) {
        this.body = data;
    }

    addHeader(key, value) {
        this.headers[key] = value;
    }

    getResponseMessage() {
        const statusText = 'OK';

        const headerLines = _.mapKeys(this.headers, (val, key) => {
            return `${key}:${val}`;
        });

        return `HTTP/1.1 ${this.statusCode} ${statusText}\n\n ${this.body}`;
    }
}
