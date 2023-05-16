// import { Asset, assetManager, AssetManager, BufferAsset, Canvas, CanvasPool, find, ImageAsset, SceneAsset, Sprite, SpriteFrame, TextAsset, Texture2D } from "cc";
// import { DownloadHelper } from "./DownloadHelper";
// import { ImageHashInfo } from "./ResUnpack/ImageHashInfo";

// /**
//  * bundle 加载回调接口
//  */
// interface ICompleteBundleCallBack {
//     (err: Error, bundle: AssetManager.Bundle): void;
// }

// /**
//  * 资源加载回调接口
//  */
// interface ILoadResCompletedCallBack {
//     (err: Error, asset : Asset): void
// }

// /**
//  * 预加载回调接口
//  */
// interface IPreLoadResCompletedCallBack {
//     (err: Error, asset : typeof Asset): void
// }

// export class ResMgr {
//     private constructor(){}
//     private static _instance: ResMgr;
//     static get instance () {
//         if (!this._instance) {
//             this._instance = new ResMgr();
//             this._instance!.init();
//         }
//         return this._instance;
//     }

//     static readonly OFFICIAL_PATH = "official/";
//     static readonly AGENT_PATH = "agent/";
//     static readonly ARTRES_PATH = "artres/";
//     static readonly ARTRES_EXT = ".png";
//     static readonly ARTRES_EXT_ENC = ".enc";

//     init(){
//         /**重新注册图片资源加载方式 */
//         assetManager.downloader.register('.png', function (url, options, callback) {
//             DownloadHelper.downloadImage(url, options, callback);
//         });
        
//         /**注册配置图片解析方式 */
//         assetManager.parser.register('.png', function(file, options, callback){
//             // callback(null, file);
//             //如果是无压缩资源还是走引擎解析流程否则创建纹理压入纹理缓存
//             if(!options.IsCompress){
//                 assetManager.parser.parseImage(file, options, callback);
//             }
//             else{
//                 // let node = new Node();
//                 // let spriteFrame:SpriteFrame = new SpriteFrame()
//                 // let img:ImageAsset = new ImageAsset()
//                 // img.reset({
//                 //     _data:new Uint8Array(file),
//                 //     _compressed:false,
//                 //     width:2047,
//                 //     height:2047,
//                 //     format:Texture2D.PixelFormat.RGBA8888
//                 // })
    
//                 // let texture = new Texture2D();
//                 // texture.image = img;

//                 // callback(null, img);

//                 // texture.image = img;

//                 // CanvasPool.getInstance().get().canvas
//                 // spriteFrame.texture = texture;
                
//                 // node.addComponent(Sprite).spriteFrame = spriteFrame;
//                 // node.setScale(new Vec3(0.3, 0.3, 0));
//                 // this.node.addChild(node);
// // 
//                 callback(null, file);
//             }
            
//             // BufferAsset
//         });

//         /**重新注册 配置资源加载方式 */
//         assetManager.downloader.register('.hash', function (url, options, callback) {
//             DownloadHelper.downloadHash(url, options, callback);
//         });

//         /**注册配置文件解析方式 */
//         assetManager.parser.register('.hash', function(file, options, callback){
//             callback(null, file);
//             // BufferAsset
//         });
//     }

//     loadAny(url:string, ext:string, onCompleted:ILoadResCompletedCallBack){
//         assetManager.loadAny({url:url}, {ext:ext}, onCompleted);
//     }

//     /**
//      * 加载远程资源文件
//      * @param url 资源链接
//      * @param ext 资源扩展名 .png/
//      * @param onCompleted 
//      */
//     // loadRemote(url:string, onCompleted:ILoadResCompletedCallBack)
//     loadRemote(url:string, onCompleted:ILoadResCompletedCallBack, options?: {
//         [k: string]: any;
//         ext?: string;
//     }){
//         if(options){
//             assetManager.loadRemote(url, options, onCompleted)
//         }
//         else{
//             assetManager.loadRemote(url, onCompleted)
//         }
//         // (error: Error, assets: Asset) => void
//     }

//     /**
//      * 加载bundle
//      * @param name 地址或名称
//      * @param onCompleted 加载完成回调
//      */
//     loadBundle(name: string, onCompleted: ICompleteBundleCallBack) {
//         assetManager.loadBundle(name, onCompleted);
//     }

//     /**
//      * 加载bundle，通过hash指定的方式
//      * @param name 
//      * @param hashV 
//      * @param onCompleted 
//      */
//     loadBundleByHash(name: string, hashV: string, onCompleted: ICompleteBundleCallBack) {
//         assetManager.loadBundle(name, { version: `${hashV}` }, onCompleted);
//     }

//     /**
//      * 获取加载过缓存下来的bundle资源
//      * @param name 
//      */
//     getBundle(name: string): AssetManager.Bundle {
//         return assetManager.getBundle(name);
//     }

//     /**
//      * 移除加载过缓存下来的bundle资源
//      * @param cc.AssetManager.Bundle 
//      */
//     removeBundle(name: AssetManager.Bundle) {
//         assetManager.removeBundle(name);
//     }

//     /**
//      * 加载bundle中的资源
//      * @param name bundle名
//      * @param url 资源路径
//      * @param type 资源类型
//      * @param loadCompleted 
//      */
//     loadRes(name: string, url: string, type: typeof Asset, loadCompleted: (error: Error, assets: Asset) => void) {
//         let finishCallBack = (error: Error, bundle: AssetManager.Bundle) => {
//             if (!error) {
//                 bundle.load(url, type, loadCompleted);
//             }
//         }
//         if (ResMgr.instance.getBundle(name)) {
//             ResMgr.instance.getBundle(name).load(url, type, loadCompleted);
//         }
//         else {
//             assetManager.loadBundle(name, finishCallBack,);
//         }

//     }

//     /**
//      * 加载bundle中dir中资源
//      * @param name bundle名
//      * @param url 资源路径
//      * @param loadCompleted 
//      */
//     loadDirRes(name: string, url: string, type: typeof Asset, loadCompleted: (error: Error, assets: Array<Asset>) => void) {
//         let finishCallBack = (error, bundle: AssetManager.Bundle) => {
//             if (!error) {
//                 if (type) {
//                     bundle.loadDir(url, type, loadCompleted);
//                 } else {
//                     bundle.loadDir(url, loadCompleted);
//                 }
//             }
//         }
//         assetManager.loadBundle(name, finishCallBack,);
//     }

//     /**
//      * 加载bundle中的场景
//      * @param name bundle名
//      * @param sceneUrl 场景资源路径
//      * @param type 资源类型
//      * @param loadCompleted 
//      * @returns 该方法只会加载场景，而不会运行场景，如需运行请使用 `cc.director.runScene` 
//      */
//     loadScene(name: string, sceneUrl: string, loadCompleted: (error: Error, sceneAsset: SceneAsset) => void) {
//         let finishCallBack = (error, bundle) => {
//             if (!error) {
//                 bundle.loadScene(sceneUrl, loadCompleted);
//             }
//         }
//         assetManager.loadBundle(name, finishCallBack,);
//     }

//     /**
//      * 预加载bundle中的资源
//      * @param name 
//      * @param url 
//      * @param type 
//      * @param loadCompleted RequestItem
//      */
//     preloadRes(name: string, url: string, type: typeof Asset, preloadCompleted: (error: Error, items: AssetManager.RequestItem[]) => void) {
//         let finishCallBack = (error, bundle: AssetManager.Bundle) => {
//             if (!error) {
//                 bundle.preload(url, type, preloadCompleted);
//             }
//         }
//         assetManager.loadBundle(name, finishCallBack,);
//     }


//     /**
//      * 预加载bundle中dir中的资源
//      * @param name 
//      * @param url 
//      * @param type 
//      * @param preloadCompleted 
//      */
//     preloadDirRes(name: string, url: string, type: typeof Asset, preloadCompleted: (error: Error, items: AssetManager.RequestItem[]) => void) {
//         let finishCallBack = (error, bundle: AssetManager.Bundle) => {
//             if (!error) {
//                 bundle.preloadDir(url, type, preloadCompleted);
//             }
//         }
//         assetManager.loadBundle(name, finishCallBack,);
//     }

//         /**
//      * 预加载bundle中dir中的资源有进度
//      * @param name 
//      * @param url 
//      * @param type 
//      * @param preloadCompleted 
//      */
//     //preloadDir(name: string, url: string, type: typeof cc.Asset, preloadCompleted: (error: Error, items: cc.AssetManager.RequestItem[]) => void) {
//     preloadDir(name: string, dir:string, onProgress: (finish: number, total: number, item: AssetManager.RequestItem) => void, onComplete: (error: Error, items: AssetManager.RequestItem[]) => void): void{    
//         let finishCallBack = (error, bundle: AssetManager.Bundle) => {
//             if (!error) {
//                 bundle.preloadDir(dir, onProgress, onComplete);
//             }
//         }
//         assetManager.loadBundle(name, finishCallBack,);
//     }


//     /**
//      * 释放所有属于asset-bundle的资源谨慎使用很危险
//      */
//     relaseAllBundle(name: string) {
//         let bundle = assetManager.getBundle(name);
//         if (bundle)
//             bundle.releaseAll();
//     }


//     /**
//      * 释放bundle中的某个资源
//      * @param name 
//      * @param url 
//      * @param type 
//      */
//     relaseBundleRes(name: string, url: string, type: typeof Asset) {
//         let bundle = assetManager.getBundle(name);
//         if (bundle)
//             bundle.release(url, type);
//     }

//     /**
//      * 
//      * @param _ImageID 图片ID
//      * @returns 
//      */
//     GetResTexFullFolder(_ImageID:number){
//         return '';
//     }
// }


