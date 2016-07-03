import fsp from 'fs-promise';

import {Middleware} from './middleware';

export class FileReadMiddleware extends Middleware {
    process(req, res, next, done) {
        const path = req.path;

        fsp.readFile(path, 'utf-8')
            .then((data) => {
                res.status(200);
                res.body(data);

                next();
            })
            .catch((error) => {
                res.status(404);

                done();
            });
    }
}
