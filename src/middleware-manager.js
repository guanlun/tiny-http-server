import {CacheControlMiddleware} from './middlewares/cache-control-middleware';

export class MiddlewareManager {
    constructor(req, res) {
        this.request = req;
        this.response = res;

        this.middlewares = [
            new CacheControlMiddleware(),
        ];

        this._middlewareIndex = 0;

        this.processNextMiddleware();
    }

    processNextMiddleware() {
    }

    finishProcessingMiddleware() {

    }
}
