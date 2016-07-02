import _ from 'lodash';

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

    getResponseMessage() {
        const statusText = 'OK';
        const headerLines = _.mapKeys(this.headers, (val, key) => {
            return `${key}:${val}`;
        });
        return headerLines;
        // const headerText
        //
        // return `HTTP/1.1 ${this.statusCode} ${statusText}\n`
    }
}
