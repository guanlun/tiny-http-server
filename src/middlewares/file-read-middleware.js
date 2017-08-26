import { fs } from 'mz';

import { Middleware } from './middleware';

export class FileReadMiddleware extends Middleware {
    process(req, res, next, done) {
        const path = req.path;

        fs.readFile(path)
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
