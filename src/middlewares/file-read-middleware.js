import fsp from 'fs-promise';

import {Middleware} from './middleware';

export class FileReadMiddleware extends Middleware {
    process(req, res, next, done) {
        const path = req.path;

        fsp.readFile(path)
            .then((data) => {
                res.status(200);
                res.setBody(data);

                next();
            })
            .catch((error) => {
                res.status(404);

                done();
            });
    }
}
