import {Get, JsonController, Req} from "routing-controllers";
import Token from "../util/token";


@JsonController('/')
export default class CommonController {
    constructor() {
    }

    @Get('checkToken')
    public checkToken(@Req()req: any) {
        const {authorization} = req.headers;
        // try{
        const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
        const payload = Token.decodeToken(token);
        return payload;
        // }catch(e){
        //     console.log(e);
        //     return false;
        // }

    }
}