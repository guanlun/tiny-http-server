import {TinyHttpRequest} from './tiny-http-request';
import {TinyHttpResponse} from './tiny-http-response';

import {HttpMethodMiddleware} from './middlewares/http-method-middleware';
import {FileReadMiddleware} from './middlewares/file-read-middleware';
import {MimeTypeMiddleware} from './middlewares/mime-type-middleware';
import {EncodingMiddleware} from './middlewares/encoding-middleware';
import {CacheControlMiddleware} from './middlewares/cache-control-middleware';

export class MiddlewareManager {
    constructor(data) {
        this._request = new TinyHttpRequest(data);
        this._response = new TinyHttpResponse();

        this._middlewares = [
            new HttpMethodMiddleware(),
            new FileReadMiddleware(),
            new MimeTypeMiddleware(),
            // new EncodingMiddleware(),
            new CacheControlMiddleware(),
        ];

        this._middlewareIndex = -1;
    }

    process(finishCallback) {
        this._finishCallback = finishCallback;

        this._processNextMiddleware();
    }

    _processNextMiddleware() {
        this._middlewareIndex++;

        if (this._middlewareIndex >= this._middlewares.length) {
            this._finishProcessingMiddleware();
            return;
        }

        this._middlewares[this._middlewareIndex].process(
            this._request,
            this._response,
            this._processNextMiddleware.bind(this),
            this._finishProcessingMiddleware.bind(this)
        );
    }

    _finishProcessingMiddleware() {
        this._finishCallback(this._response);
    }
}
