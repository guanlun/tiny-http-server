import {Middleware} from './middleware';

export class MimeTypeMiddleware extends Middleware {
    process(req, res, next, done) {
        const acceptType = req.headers['Accept'];

        if (acceptType.indexOf('image') === 0) {
            res.addHeader('Content-Type', 'image/png');
        }

        next();
    }
}
