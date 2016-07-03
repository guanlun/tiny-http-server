import {Middleware} from './middleware';

export class CacheControlMiddleware extends Middleware {
    process(req, res, next, done) {
        console.log('processing cache control middleware');
        next();
    }
}
