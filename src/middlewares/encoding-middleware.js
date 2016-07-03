import zlib from 'zlib';

import {Middleware} from './middleware';

export class EncodingMiddleware extends Middleware {
    process(req, res, next, done) {
        const acceptEncoding = req.headers['Accept-Encoding'];

        this._encodings = acceptEncoding.split(', ');

        if (this._encodings.indexOf('gzip') === -1) {
            // Does not accept gzip encoding.
            next();
            return;
        }

        const gzippedBody = zlib.gzip(res.body, (error, data) => {
            if (error) {
                res.status(500);
                res.setBody(error);
                done();

            } else {
                res.addHeader('Content-Encoding', 'gzip');
                res.setBody(data);
                next();
            }
        });
    }
}
