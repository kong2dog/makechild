import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import WebGLScene from '../WebGLScene';
interface appOptions {
    dom: HTMLElement;
    webGLScene?: WebGLScene;
    defaultWidth?: number;
    defaultHeight?: number;
}
export default class Application extends THREE.EventDispatcher {
    dom: HTMLElement;
    stats: any;
    canvas: HTMLCanvasElement;
    webGLScene: WebGLScene;
    defaultWidth?: number;
    defaultHeight?: number;
    renderer: THREE.WebGLRenderer;
    labelRenderer: CSS2DRenderer;
    private __webglcontextlost_fun_;
    private __window__visibilitychange__;
    constructor({ dom, webGLScene, defaultWidth, defaultHeight }: appOptions);
    private create;
    switchToScene(webGLScene: WebGLScene): void;
    private render;
    resize(width?: number, height?: number): void;
    private clearRender;
    private mountApplationEvent;
    private unMountApplationEvent;
    dispose(): void;
}
export {};
