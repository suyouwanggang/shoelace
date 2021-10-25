import {
  unWrapData,
  wrapData
} from "../../chunks/chunk.XEZ2JUYH.js";
import {
  defaultResove
} from "../../chunks/chunk.Y7OE5YUP.js";
import "../../chunks/chunk.G5Q3RJKK.js";

// src/components/router/cryptoHashResovle.ts
var CryptoHashResovle = {
  resolvePath(hash) {
    if (hash.length > 1 && hash.substr(0, 1) == "#") {
      hash = hash.slice(1);
    }
    const decryptData = unWrapData(hash);
    return defaultResove.resolvePath(decryptData);
  },
  toPath(url, jsonData) {
    const result = defaultResove.toPath(url, jsonData);
    const enryptText = wrapData(result);
    return enryptText;
  }
};
export {
  CryptoHashResovle
};
