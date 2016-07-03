import {Middleware} from './middleware';

export class HttpMethodMiddleware extends Middleware {
    process(req, res, next, done) {
        if (req.method !== 'GET') {
            // Currently only allow GET method
            res.status(405);
            done();
        } else {
            next();
        }
    }
}
