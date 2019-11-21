export default class AjaxResponse{
    public status:number; // 0-成功 1-失败
    public message:string; // 返回的内容
    public data:string;
    constructor(status?:number,message?:string,data?:any)
    {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
