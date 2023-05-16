// import { _decorator, Component, Node, sys, debug, getError, assetManager, assert, ImageAsset, BufferAsset, native } from 'cc';
// import { DEBUG, JSB } from 'cc/env';
// import CryptoES from 'crypto-es';
// import { DeserializeHelper } from './ResUnpack/DeserializeHelper';

// import webwss from "./Thirdpart/web5.js"
// // import lzmad from '../linxitest/lzma-d.js'
// // import {  ArchiveReader } from 'libarchive-wasm';
// // import { ArchiveReader } from './archive/ArchiveReader';

// // import libarchive from './libarchive.js'
// import { TaskPipeline } from './TaskPipeline';
// import { MTextureHead } from './ResUnpack/MTextureInfo';
// // import LZMA from 'lzma-web';
// const { ccclass, property } = _decorator; 

// // async function loadWasm() {
// //     // 以 Uint8Array 的形式加载 .wasm 文件 尝试使用webassembly
// //     const wasmBinary = await new Promise<Uint8Array>((resolve, reject) => {
// //         assetManager.loadAny<BufferAsset>('c1b689a1-8310-4019-abbe-4a1968288c19', (error, asset) => {
// //             if (error) {
// //                 reject(error);
// //             } else {
// //                 resolve(new Uint8Array(asset.buffer()!));
// //             }
// //         });
// //     });
// //     // 调用 Emscripten 模块函数
// //     const module = await libarchive({
// //         wasmBinary,
// //     });

// //     // 你初始化好的 Emscripten 模块
// //     return module;
// //  }

// const imgTypes = {
//     "png":"image/png",
//     "jpg":"image/jpg",
//     "jpeg":"image/jpeg",
// }

// const UNZIP_BUFF_SIZE:number = (1 << 24) + (1 << 10);

// const evp_res_key:number[] = [
//     0x48, 0x3F, 0x7C, 0x9F, 0x15, 0x74, 0x61, 0x4A, 0xDE, 0x86, 0x73, 0x30, 0xB7, 0xCC, 0xD8, 0xFE,
//     // 0xE6, 0xCE, 0xA2, 0x9C, 0x54, 0x55, 0x00, 0x22, 0x94, 0x8E, 0xA0, 0x8A, 0x89, 0x58, 0x61, 0xCD
// ];

// // const evp_res_key:number[] = [
// //     0x48, 0x3F, 0x7C, 0x9F, 0x15, 0x74, 0x61, 0x4A, 0xDE, 0x86, 0x73, 0x30, 0xB7, 0xCC, 0xD8, 0xFE,
// //     0xE6, 0xCE, 0xA2, 0x9C, 0x54, 0x55, 0x00, 0x22, 0x94, 0x8E, 0xA0, 0x8A, 0x89, 0x58, 0x61, 0xCD
// // ];

// function downloadDomImage (url, options, onComplete) {
//     var { options, onComplete } = parseParameters(options, undefined, onComplete);

//     var img = new Image();

//     if (window.location.protocol !== 'file:') {
//         img.crossOrigin = 'anonymous';
//     }

//     function loadCallback () {
//         img.removeEventListener('load', loadCallback);
//         img.removeEventListener('error', errorCallback);
//         onComplete && onComplete(null, img);
//     }
    
//     function errorCallback () {
//         img.removeEventListener('load', loadCallback);
//         img.removeEventListener('error', errorCallback);
//         onComplete && onComplete(new Error(getError(4930, url)));
//     }

//     img.addEventListener('load', loadCallback);
//     img.addEventListener('error', errorCallback);
//     img.src = url;
//     return img;
// }

// function parseParameters (options, onProgress, onComplete) {
//     if (onComplete === undefined) {
//         var isCallback = typeof options === 'function';
//         if (onProgress) {
//             onComplete = onProgress;
//             if (!isCallback) {
//                 onProgress = null;
//             }
//         }
//         else if (onProgress === undefined && isCallback) {
//             onComplete = options;
//             options = null;
//             onProgress = null;
//         }
//         if (onProgress !== undefined && isCallback) {
//             onProgress = options;
//             options = null;
//         }
//     }
//     options = options || Object.create(null);
//     return { options, onProgress, onComplete };
// }

// function arrayBufferToBase64Img(buffer:ArrayBuffer){
//     const str = String.fromCharCode(...new Uint8Array(buffer));
//     // let words:CryptoES.lib.WordArray = CryptoES.lib.WordArray.create(buffer);
//     // let base64Str:string = CryptoES.enc.Base64.stringify(words);
//     return window.btoa(str);
//     // return base64Str;
// }

// @ccclass('DownloadHelper')
// export class DownloadHelper {
//     // private wasmCompress:
//     /**
//      * 下载文件
//      * @param url 
//      * @param options 
//      * @param onProgress 
//      * @param onComplete 
//      * @returns 
//      */
//     static downloadFile (url, options, onProgress, onComplete) {
//         var { options, onProgress, onComplete } = parseParameters(options, onProgress, onComplete);
    
//         var xhr = new XMLHttpRequest(), errInfo = 'download failed: ' + url + ', status: ';
    
//         xhr.open('GET', url, true);
    
//         if (options.responseType !== undefined) xhr.responseType = options.responseType;
//         if (options.withCredentials !== undefined) xhr.withCredentials = options.withCredentials;
//         if (options.mimeType !== undefined && xhr.overrideMimeType ) xhr.overrideMimeType(options.mimeType);
//         if (options.timeout !== undefined) xhr.timeout = options.timeout;
    
//         if (options.header) {
//             for (var header in options.header) {
//                 xhr.setRequestHeader(header, options.header[header]);
//             }
//         }
    
//         xhr.onload = function () {
//             if ( xhr.status === 200 || xhr.status === 0 ) {
//                 onComplete && onComplete(null, xhr.response);
//             } else {
//                 onComplete && onComplete(new Error(errInfo + xhr.status + '(no response)'));
//             }
    
//         };
    
//         if (onProgress) {
//             xhr.onprogress = function (e) {
//                 if (e.lengthComputable) {
//                     onProgress(e.loaded, e.total);
//                 }
//             };
//         }
    
//         xhr.onerror = function(){
//             onComplete && onComplete(new Error(errInfo + xhr.status + '(error)'));
//         };
    
//         xhr.ontimeout = function(){
//             onComplete && onComplete(new Error(errInfo + xhr.status + '(time out)'));
//         };
    
//         xhr.onabort = function(){
//             onComplete && onComplete(new Error(errInfo + xhr.status + '(abort)'));
//         };
    
//         xhr.send(null);
        
//         return xhr;
//     }

//     /**
//      * 以二进制的方式加载
//      * @param url 路径
//      * @param options 可选参数
//      * @param onComplete 回调
//      */
//     static async downloadArrayBuffer (url, options, onComplete) {
//         options.responseType = "arraybuffer";
//         DownloadHelper.downloadFile(url, options, options.onFileProgress, async function (err,data:ArrayBuffer) {
//             if(!err){
//                 ///解密 解压缩
//                 // let u8key:Uint8Array = new Uint8Array(evp_res_key);
//                 // let u8Buf:Uint8Array = new Uint8Array(data);
//                 // let words = CryptoES.lib.WordArray.create(u8Buf)
//                 // let cipherParamsCfg:CryptoES.lib.CipherParamsCfg = {
//                 //     ciphertext:words,
//                 // };

//                 // let aesKey = CryptoES.lib.WordArray.create(u8key);
//                 // let ivKey = CryptoES.lib.WordArray.create(new ArrayBuffer(0));
//                 // let iMode = CryptoES.mode.CFB;
//                 // let padding = CryptoES.pad.ZeroPadding;
    
//                 // let cfg:CryptoES.lib.CipherCfg = {
//                 //     mode:iMode,
//                 //     padding:padding,
//                 //     iv:ivKey
//                 // }
//                 // // key:CryptoES.enc.Hex.parse(hexKeyStr),
//                 // // let key = CryptoES.lib.WordArray.create(evp_res_key);
//                 // let deResult:CryptoES.lib.WordArray = CryptoES.AES.decrypt(CryptoES.lib.CipherParams.create(cipherParamsCfg), aesKey, cfg);
//                 // let decryptU8Buf:Uint8Array = DeserializeHelper.wordArrayToArrayBuffer(deResult);

//                 // if(JSB){
//                 //     native.fileUtils.writeDataToFile(decryptU8Buf.buffer.slice(12), native.fileUtils.getWritablePath() + 'temp\\000060010Decode.png');
//                 // }
//                 //#region 解压缩测试代码
//                 // const mod = await libarchiveWasm(null);
//                 // const reader = new ArchiveReader(mod, new Int8Array(decryptU8Buf.buffer.slice(12)));
//                 // loadWasm();
//                 // console.log(Archive);
//                 //解压缩
//                 //@ts-ignore
//                 // console.log(LZMA);
//                 // console.log(LZMA.LZMA.decompress);
//                 // // let lzmajs = new LZMA;
//                 // LZMA.LZMA.decompress(decryptU8Buf.buffer.slice(12), (res, err) => {
//                 //     if(err){
//                 //         console.log(err.message);
//                 //         // return;
//                 //     }
//                 //     console.log('success');
//                 // })

//                 // let buf = deCompressU8Buf.buffer;
//                 // let dataView = new DataView(buf);
//                 // console.log(dataView.getInt16(0, true));
//                 // console.log(dataView.getInt16(2, true));
//                 // console.log(dataView.getInt32(4, true));

//                 //@ts-ignore lzma_worker-min.js
//                 // let res = new LZMA.                                                          
//                 //@ts-ignore lzma_worker-min.js
//                 // let res = new LZMA.compress('fdsafsfsalf;jdfsafsdfasfsadfadf');
//                 // //@ts-ignore lzma_worker-min.js
//                 // new LZMA.decompress(res, (result, error) => {
//                 //     if(error){
//                 //         console.log(error.message);
//                 //         return;
//                 //     }
//                 //     console.log(result);

//                 // }, (percent) => {
//                 //     console.log(percent);
//                 // })

//                 // let temp = decryptU8Buf.slice(12);
//                 // let array = Array.from(temp);

//                 //@ts-ignore
//                 // new LZMA.decompress(temp.buffer, (result, error) => {
//                 //     if(error){
//                 //         console.log(error.message);
//                 //         return;
//                 //     }
//                 // }, (percent) => {
//                 //     console.log(percent);
//                 // })
                
//                 // console.log(LZMA);
                
//                 // let lzma = new LZMA();
//                 // let res = new LZMA.decompress(decryptU8Buf.buffer);
//                 // let buf = decryptU8Buf.buffer.slice(0, 12);
//                 // let dataView = new DataView(buf);
//                 // console.log(dataView.getInt16(0, true));
//                 // console.log(dataView.getInt16(2, true));
//                 // console.log(dataView.getInt32(4, true));
//                 // console.log(dataView.getUint8(1));
//                 // console.log(dataView.getUint8(1));
//                 // console.log(dataView.getUint8(1));
//                 // console.log(dataView.getUint8(1));

//                 // let lzma = new LZMA();
//                 // lzma.cb.decompress(decryptU8Buf.buffer.slice(12), (results, error) => {
//                 //     if (error) throw error
//                 //     console.log(results)
//                 // })
//                 // @ts-ignore
//                 // console.log(LZMA);
//                 // // console.log(lzmad);
//                 // // @ts-ignore
//                 // var inStream = new LZMA.iStream("hello world");
//                 // // @ts-ignore
//                 // var outStream = LZMA.decompressFile(inStream);
//                 // // @ts-ignore
//                 // var inStream = new LZMA.iStream(decryptU8Buf.buffer.slice(12));
//                 // // @ts-ignore
//                 // var outStream = LZMA.decompressFile(inStream);
//                 // var bytes = outStream.toUint8Array();

//                 // let lzmajs = new LZMA('../linxitest/lzma_worker.js');
//                 // console.log(LZMA);
//                 // //@ts-ignore
//                 // // let res = new LZMA.lzma2_compress('hello world');
//                 // // @ts-ignore
//                 // new LZMA.lzma2_decompress(decryptU8Buf.buffer.slice(12), (res, err) => {
//                 //     if(err){
//                 //         console.log(err.message);
//                 //         return
//                 //     }
//                 //     console.log('succeess lzma');
//                 // }, (percent) => {
//                 //     console.log(percent);
//                 // })
//                 //onComplete&&onComplete(err, decryptU8Buf.buffer.slice(12));
//                 //#endregion
//                 onComplete&&onComplete(err, data);
//             }
//             else{
//                 onComplete&&onComplete(err, null);
//             }
//         });
//     };
    
//     /**
//      * 下载图片
//      * @param url 路径
//      * @param options 可选参数
//      * @param onComplete 回调
//      */
//     static downloadImage(url:string, options:any, onComplete:Function) {
//         DownloadHelper.downloadArrayBuffer(url, options, function(err, data:ArrayBuffer){
//             if(err){
//                 DEBUG ? console.log(err.message) : null;
//                 onComplete&&onComplete(null,data);
//                 return;
//             }

//             //#region 解密解压缩 
//             ///解密 解压缩
//             let resBuf:ArrayBuffer;
//             let u8key:Uint8Array = new Uint8Array(evp_res_key);
//             let u8Buf:Uint8Array = new Uint8Array(data);
//             let words = CryptoES.lib.WordArray.create(u8Buf)
//             let cipherParamsCfg:CryptoES.lib.CipherParamsCfg = {
//                 ciphertext:words,
//             };

//             let aesKey = CryptoES.lib.WordArray.create(u8key);
//             let ivKey = CryptoES.lib.WordArray.create(new ArrayBuffer(0));
//             let iMode = CryptoES.mode.CFB;
//             let padding = CryptoES.pad.ZeroPadding;

//             let cfg:CryptoES.lib.CipherCfg = {
//                 mode:iMode,
//                 padding:padding,
//                 iv:ivKey
//             }
//             // key:CryptoES.enc.Hex.parse(hexKeyStr),
//             // let key = CryptoES.lib.WordArray.create(evp_res_key);
//             let deResult:CryptoES.lib.WordArray = CryptoES.AES.decrypt(CryptoES.lib.CipherParams.create(cipherParamsCfg), aesKey, cfg);
//             let decryptU8Buf:Uint8Array = DeserializeHelper.wordArrayToArrayBuffer(deResult); 
//             /**----------------------解压缩---------------------- */
//             let textureHead:MTextureHead = new MTextureHead(decryptU8Buf.buffer.slice(0, 12));
//             let uncompressbuf = decryptU8Buf.buffer.slice(12);
//             if(options.IsCompress){
//                 assetManager.loadAny('8efede99-47b2-4b2b-abbd-0eceb0550a8f', (error:Error, buf:BufferAsset) => {
//                     if(error){
//                         console.log(error.message);
//                         return;
//                     }
//                     webwss.Module.onRuntimeInitialized = ()=>{
//                         console.log(webwss.Module._jsadd(12, 3)); 
//                         console.log("111",webwss.Module)
//                         let Module = webwss.Module;
//                         // Module.writeDataToFile
//                         var srcbuf = Module._malloc(uncompressbuf.byteLength);
//                         Module.HEAPU8.set(new Uint8Array(uncompressbuf), srcbuf);
            
//                         var srcbufflen = uncompressbuf.byteLength;
//                         var destbuf = Module._malloc(UNZIP_BUFF_SIZE);
//                         Module.HEAPU8.set(new Uint8Array(UNZIP_BUFF_SIZE), destbuf);
                 
//                         var len = Module._jsdecodeLzmaPack(destbuf, srcbuf, srcbufflen);
//                         if(len > 0){
//                             // let dest = new Uint8Array(Module.HEAPU8.buffer, destbuf, len);
//                             let dest:ArrayBuffer = Module.HEAPU8.buffer.slice(destbuf, destbuf + len);
//                             let dataView:DataView = new DataView(dest);
//                             console.log(dest);
//                             let typeStr = imgTypes["png"];
//                             //save for web
//                             // let textFileAsBlob = new Blob([dest], {type:typeStr}); 
//                             // let downloadLink = document.createElement("a");
//                             // downloadLink.download = '000060010';
//                             // downloadLink.innerHTML = "Download File";
//                             // downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//                             // downloadLink.click();
    
//                             // let dest = Module.HEAPU8.subArray(destbuf, destbuf + len);
//                             // 1、uibase.ts、uibase2d.ts、GuiProperty.ts、RDUIManagerCL.ts
          
        
//                             // if(sys.hasFeature(sys.Feature.IMAGE_BITMAP) && assetManager.allowImageBitmap){
//                             //     let blob = new Blob([dest],{type:typeStr});
//                             //     onComplete&&onComplete(null, blob);
//                             // }else{
//                             //     let base64code = arrayBufferToBase64Img(dest);
//                             //     base64code = `data:${typeStr};base64,${base64code}`
//                             //     downloadDomImage(base64code,options,onComplete)
//                             // }
//                              onComplete&&onComplete(null, dest);
                            
//                         }
//                     }
//                     webwss.Module.buffer = buf.buffer()
//                     webwss.createWasm()
//                     webwss.run()
//                 });
//             }
//             else{
//                 let typeStr = imgTypes["png"];
        
//                 if(sys.hasFeature(sys.Feature.IMAGE_BITMAP) && assetManager.allowImageBitmap){
//                     let blob = new Blob([uncompressbuf],{type:typeStr});
//                     onComplete&&onComplete(null, blob);
//                 }else{
//                     let base64code = arrayBufferToBase64Img(uncompressbuf);
//                     base64code = `data:${typeStr};base64,${base64code}`
//                     downloadDomImage(base64code,options,onComplete)
//                 }
//             }

//             // resBuf = decryptU8Buf.buffer.slice(12);
//             //#endregion
//         })
//     };

//     static downloadHash(url:string, options:any, onComplete:Function){
//         DownloadHelper.downloadArrayBuffer(url, options, function(err, data:ArrayBuffer){
//             // if(err){
//             //     DEBUG ? console.log(err.message) : null;
//             //     onComplete&&onComplete(null,data);
//             //     return;
//             // }
//             // //#region 解密解压缩
//             // ///解密 解压缩
//             // let resBuf:ArrayBuffer;
//             // let u8key:Uint8Array = new Uint8Array(evp_res_key);
//             // let u8Buf:Uint8Array = new Uint8Array(data);
//             // let words = CryptoES.lib.WordArray.create(u8Buf)
//             // let cipherParamsCfg:CryptoES.lib.CipherParamsCfg = {
//             //     ciphertext:words,
//             // };

//             // let aesKey = CryptoES.lib.WordArray.create(u8key);
//             // let ivKey = CryptoES.lib.WordArray.create(new ArrayBuffer(0));
//             // let iMode = CryptoES.mode.CFB;
//             // let padding = CryptoES.pad.ZeroPadding;

//             // let cfg:CryptoES.lib.CipherCfg = {
//             //     mode:iMode,
//             //     padding:padding,
//             //     iv:ivKey
//             // }
//             // let deResult:CryptoES.lib.WordArray = CryptoES.AES.decrypt(CryptoES.lib.CipherParams.create(cipherParamsCfg), aesKey, cfg);
//             // let decryptU8Buf:Uint8Array = DeserializeHelper.wordArrayToArrayBuffer(deResult);
//             // /**----------------------解压缩---------------------- */
//             // // @ts-ignore
//             // let inflate  = new Zlib.Inflate(decryptU8Buf, {index: 0, verify: false });
//             // resBuf = inflate.decompress().buffer;
//             // //#endregion
//             // onComplete&&onComplete(null,resBuf);


//             if(err){
//                 DEBUG ? console.log(err.message) : null;
//                 onComplete&&onComplete(null,data);
//                 return;
//             }

//             //#region 解密解压缩 
//             ///解密 解压缩
//             let resBuf:ArrayBuffer;
//             let u8key:Uint8Array = new Uint8Array(evp_res_key);
//             let u8Buf:Uint8Array = new Uint8Array(data);
//             let words = CryptoES.lib.WordArray.create(u8Buf)
//             let cipherParamsCfg:CryptoES.lib.CipherParamsCfg = {
//                 ciphertext:words,
//             };

//             let aesKey = CryptoES.lib.WordArray.create(u8key);
//             let ivKey = CryptoES.lib.WordArray.create(new ArrayBuffer(0));
//             let iMode = CryptoES.mode.CFB;
//             let padding = CryptoES.pad.ZeroPadding;

//             let cfg:CryptoES.lib.CipherCfg = {
//                 mode:iMode,
//                 padding:padding,
//                 iv:ivKey
//             }
//             // key:CryptoES.enc.Hex.parse(hexKeyStr),
//             // let key = CryptoES.lib.WordArray.create(evp_res_key);
//             let deResult:CryptoES.lib.WordArray = CryptoES.AES.decrypt(CryptoES.lib.CipherParams.create(cipherParamsCfg), aesKey, cfg);
//             let decryptU8Buf:Uint8Array = DeserializeHelper.wordArrayToArrayBuffer(deResult); 
//             /**----------------------解压缩---------------------- */
//             let textureHead:MTextureHead = new MTextureHead(decryptU8Buf.buffer.slice(0, 12));
//             let uncompressbuf = decryptU8Buf.buffer.slice(12);
//             // let typeStr = imgTypes["png"];
    
//             // if(sys.hasFeature(sys.Feature.IMAGE_BITMAP) && assetManager.allowImageBitmap){
//             //     let blob = new Blob([uncompressbuf],{type:typeStr});
//             //     onComplete&&onComplete(null, blob);
//             // }else{
//             //     let base64code = arrayBufferToBase64Img(uncompressbuf);
//             //     base64code = `data:${typeStr};base64,${base64code}`
//             //     downloadDomImage(base64code,options,onComplete)
//             // }
           
//             assetManager.loadAny('8efede99-47b2-4b2b-abbd-0eceb0550a8f', (error:Error, buf:BufferAsset) => {
//                 if(error){
//                     console.log(error.message);
//                     return;
//                 }
//                 webwss.Module.onRuntimeInitialized = ()=>{
//                     console.log(webwss.Module._jsadd(12, 3)); 
//                     console.log("111",webwss.Module)
//                     let Module = webwss.Module;
//                     // Module.writeDataToFile
//                     var srcbuf = Module._malloc(uncompressbuf.byteLength);
//                     Module.HEAPU8.set(new Uint8Array(uncompressbuf), srcbuf);
        
//                     var srcbufflen = uncompressbuf.byteLength;
//                     var destbuf = Module._malloc(UNZIP_BUFF_SIZE);
//                     Module.HEAPU8.set(new Uint8Array(UNZIP_BUFF_SIZE), destbuf);
             
//                     var len = Module._jsdecodeLzmaPack(destbuf, srcbuf, srcbufflen);
//                     if(len > 0){
//                         // let dest = new Uint8Array(Module.HEAPU8.buffer, destbuf, len);
//                         let dest:ArrayBuffer = Module.HEAPU8.buffer.slice(destbuf, destbuf + len);
//                         let dataView:DataView = new DataView(dest);
//                         console.log(dest);
//                         let typeStr = imgTypes["png"];
//                         //save for web
//                         // let textFileAsBlob = new Blob([dest], {type:typeStr}); 
//                         // let downloadLink = document.createElement("a");
//                         // downloadLink.download = '000060010';
//                         // downloadLink.innerHTML = "Download File";
//                         // downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//                         // downloadLink.click();

//                         // let dest = Module.HEAPU8.subArray(destbuf, destbuf + len);
//                         // 1、uibase.ts、uibase2d.ts、GuiProperty.ts、RDUIManagerCL.ts
      
    
//                         // if(sys.hasFeature(sys.Feature.IMAGE_BITMAP) && assetManager.allowImageBitmap){
//                         //     let blob = new Blob([dest],{type:typeStr});
//                         //     onComplete&&onComplete(null, blob);
//                         // }else{
//                         //     let base64code = arrayBufferToBase64Img(dest);
//                         //     base64code = `data:${typeStr};base64,${base64code}`
//                         //     downloadDomImage(base64code,options,onComplete)
//                         // }
//                          onComplete&&onComplete(null, dest);
                        
//                     }
//                 }
//                 webwss.Module.buffer = buf.buffer()
//                 webwss.createWasm()
//                 webwss.run()
//             });
//         })
//     }
    
// }


