import * as express from 'express';
import {ExpressErrorMiddlewareInterface, HttpError, Middleware} from 'routing-controllers';


@Middleware({type: 'after'})
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {


    constructor() {
    }

    public error(error: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
        console.log('系统出错=',error);
        console.log('error.httpCode=',error.httpCode);
        error.stack='';
        res.status(error.httpCode || 500);
        res.json(error.message);

    }

}
