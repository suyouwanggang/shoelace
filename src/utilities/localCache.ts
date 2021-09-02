import Utf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
const secrityKey='wanggang`zhengming&5566&easytrack';
const secrikyObj={
    secrityKey:secrityKey,
};
export const secrityKeyObj={
    setSecrityKey(key:string){
        secrikyObj.secrityKey=key;
        valueMap.clear();
    },
    getSecrityKey(){
        return secrikyObj.secrityKey;
    }
}
const valueMap=new Map<string,string>();
const wrapValueFun=(key:string)=>{
   return AES.encrypt(key,secrityKeyObj.getSecrityKey()).toString();;
    // return key;
}
const unWrapValueFun=(key:string)=>{
   let wrapKey= AES.decrypt(key,secrityKeyObj.getSecrityKey()).toString(Utf8);
   return wrapKey;
    //   return key;
}
/**
 * 
 * @param key 存储数据key
 * @param value  存储数据,必须支持JSON化
 */
export const setLocalCache=(key:string,value:any)=>{
    let valueString=JSON.stringify(value);
    localStorage.setItem(key, wrapValueFun(valueString));
}
/**
 * 获取缓存数据
 * @param key 
 * @returns 
 */
export const getLocalCache=(key:string)=>{
    let value=localStorage.getItem(key);
    if(value){
        value=unWrapValueFun(value);
        value=JSON.parse(value);
    }else {
        value=null;
    }
    return value as any;
}
/**
 * 删除缓存数据
 * @param key 
 */
export const removeLocalCache=(key:string)=>{
    if(key){
        localStorage.removeItem(key);
    }
   
}