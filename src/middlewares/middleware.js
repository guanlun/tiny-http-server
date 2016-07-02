export class Middleware {
    constructor(req, res, next, done) {
        this.request = req;
        this.response = res;
        this.next = next;
        this.done = done;
    }

    process(req, res, next, done) {
        console.error('Not implemented');
    }
}
