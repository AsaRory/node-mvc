export default class HttpError extends Error{
    public status:number;
    public code:number;
    public message:string;
    public name:string;
    constructor(status?:number,code?:number,message?:string)
    {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
