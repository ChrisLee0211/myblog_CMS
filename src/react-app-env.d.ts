// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />
/// <reference path="./types/response.d.ts" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly NODE_BUILD: "local" | "internetional";
        readonly PUBLIC_URL: string;
    }
}

declare module "*.bmp" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.sass" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.less" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "concent-middleware-web-devtool" {
    export const concentWebDevToolMiddleware: any;
}
/**
 * 进度条配置项
 */
interface NProgressOptions {
    /**
     * 是否显示旋转进度条
     * @description 位于右上角的旋转进度条
     */
    showSpinner?: boolean;
    /**
     * 速度(以毫秒为空位)
     */
    speed?: number;
}
/**
 * 顶部进度条
 */
interface NProgress {
    /**
     * 配置进度条
     */
    configure(options?: NProgressOptions): void;
    /**
     * 设置进度条百分比
     * @param n 百分比,范围 `0.0` - `1.0`
     */
    set(n: number): void;
    /**
     * 开始进度条
     */
    start(): void;
    /**
     * 结束进度条
     */
    done(): void;
}
declare let nprogress: NProgress;
declare module "nprogress" {
    export default nprogress;
}

interface ConcentPlugin {
    install: (on: any) => { name: string };
}
declare let plugin: ConcentPlugin;
declare module "concent-plugin-redux-devtool" {
    export default pulgin;
}

interface entryRouterModel {
    path: string;
    component?: any;
    auth?: boolean;
    meta: MetaItem;
    exact?: boolean;
    target?: routerConfigModel[];
}
/**
 * @param path:路径
 * @param component:目标渲染组件
 * @param auth:是否需要鉴权
 * @param meta:路由基本信息，包括title、icon、role等
 * @param exact:是否精准匹配(谨慎使用，使用前请熟读 https://juejin.im/post/5cd445575188253779614b69)
 * @param children:是否有子路由
 */
interface routerConfigModel {
    path: string;
    component?: any;
    auth?: boolean;
    meta: MetaItem;
    exact?: boolean;
    children?: routerConfigModel[];
}
interface MetaItem {
    title: string;
    icon?: string;
    role: string;
}

//监听器回调函数中的参数类型，自带元素本身(target)与对应的只读位置、大小信息(contentRect)
interface ResizeObserverEntry {
    target: HTMLElement | null;
    contentRect: ResizeObserverEntry["target"] extends null? null : DOMRectReadOnly
}
// 监听器构造函数所需要传入的回调函数
type EntriesFuntion = (entries:Array<ResizeObserverEntry>)=>void;
/**
 * 元素大小、位置变化监听器
 */
declare class ResizeObserver {
    /**
     * 元素大小、位置变化监听器
     * @param entriesFn 关于挂载到监听器的回调函数
     * @returns {Observer} 返回一个监听器对象
     */
    constructor(entriesFn:EntriesFuntion): ResizeObserver{};
    /**
     * 执行目标元素的监听
     * @param target 要执行监听的目标元素
     * @param options 可选像，设置元素的盒子模型，默认为content-box
     * @returns {void}
     */
    observe(target:HTMLElement|null,options?:{box:'border-box'|"content-box"}):void;

    /**
     * 取消目标元素的监听
     * @param target 要取消执行监听的目标元素
     * @returns {void}
     */
    unobserve(target:HTMLElement|null):void

    /**
     * 取消所有元素监听
     */
    disconnect():void
}