
export function getUrlParqms(url:string):object {
    if(!url){
        return {}
    }
    if(url.indexOf('?')<0){
        return {}
    }
    const urls:string[] = url.split('?');
    const parmasStr:string[]=urls[1].split('&');
    const result:any = {};
    parmasStr.forEach(
        item=>{
            const keyValues:string[] = item.split('=');
            const [key,value] = keyValues;
            result [key] = value;
        }
    )
    return result;
}
