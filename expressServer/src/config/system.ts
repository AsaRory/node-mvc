import * as dotenv from 'dotenv';
import path from "path";


// 可以修改选择的env文件
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'develop') ? '.develop' : '')}`) });


/**
 * 这个文件计划的是可能进行改动的配置。如加密秘钥
 */
export const tokenConfig={
    secret:'AsaRory',
    openUrl:[
        /^\/index/,
    ]
}

export const database={
    prefix:'nideshop_'
}

export const wxConfig={
    appid: process.env.WX_APPID,
    secret:process.env.WX_SECRET
}
// console.log('wxConfig=',wxConfig);
// console.log(process)