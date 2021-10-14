import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
const secrityKey = 'wanggang&zhengming&easytrack';
const secrikyObj = {
  secrityKey: secrityKey
};
export const secrityKeyObj = {
  setSecrityKey(key: string) {
    secrikyObj.secrityKey = key;
  },
  getSecrityKey() {
    return secrikyObj.secrityKey;
  }
};
/**AES 加密数据*/
export const wrapData = (key: string) => {
  return AES.encrypt(key, secrityKeyObj.getSecrityKey()).toString();
  // return key;
};
/**AES 解密数据*/
export const unWrapData = (key: string) => {
  let wrapKey = AES.decrypt(key, secrityKeyObj.getSecrityKey()).toString(Utf8);
  return wrapKey;
  //   return key;
};
