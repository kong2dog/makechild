"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Application 中一些依赖
 *  canvas,
 *  renderer, // 需要迁移 放在 WebGLScene
 *  labelRenderer // 需要迁移
 *
 */
const stats_js_1 = __importDefault(require("stats.js"));
const THREE = __importStar(require("three"));
const CSS2DRenderer_js_1 = require("three/examples/jsm/renderers/CSS2DRenderer.js");
const defaultWidth = 200;
const defaultHeight = 100;
class Application extends THREE.EventDispatcher {
    constructor({ dom, webGLScene, defaultWidth, defaultHeight }) {
        super();
        this.dom = dom;
        this.defaultWidth = defaultWidth;
        this.defaultHeight = defaultHeight;
        this.dom.style.position = 'relative';
        this.create();
        if (webGLScene)
            this.switchToScene(webGLScene);
    }
    create() {
        // 创建canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        const width = this.dom.clientWidth || this.defaultWidth || window.innerWidth;
        const height = this.dom.clientHeight || this.defaultHeight || window.innerHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.dom.appendChild(this.canvas);
        // 创建 webglrender
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            logarithmicDepthBuffer: true,
            powerPreference: 'high-performance',
        });
        this.renderer.localClippingEnabled = true;
        const pixelRadio = Math.min(2, window.devicePixelRatio);
        this.renderer.setPixelRatio(pixelRadio);
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 创建labelRender
        this.labelRenderer = new CSS2DRenderer_js_1.CSS2DRenderer();
        this.labelRenderer.setSize(width, height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.setAttribute('class', 'apm3d-labelcontainer');
        this.labelRenderer.domElement.style.top = '0px';
        this.dom.appendChild(this.labelRenderer.domElement);
        this.stats = new stats_js_1.default();
        this.dom.appendChild(this.stats.domElement);
        // 挂载应用级事件
        this.mountApplationEvent();
        // 启用帧调用
        this.renderer.setAnimationLoop(() => this.render());
    }
    // 切换到莫哥场景
    switchToScene(webGLScene) {
        // 需要清理两个render
        this.clearRender();
        this.webGLScene = webGLScene;
        this.webGLScene.init(this.renderer, this.labelRenderer);
    }
    render() {
        if (this.stats) {
            this.stats.update();
        }
        this.webGLScene?.render();
    }
    resize(width, height) {
        const nwidth = width || this.dom.offsetWidth || this.defaultWidth || defaultWidth;
        const nheight = height || this.dom.clientHeight || this.defaultHeight || defaultHeight;
        if (this.canvas) {
            this.canvas.width = nwidth;
            this.canvas.height = nheight;
        }
        if (this.renderer) {
            this.renderer.setSize(nwidth, nheight);
        }
        if (this.labelRenderer) {
            this.labelRenderer.setSize(nwidth, nheight);
        }
        this.webGLScene?.resize();
    }
    clearRender() {
        this.renderer?.clear();
        if (this.labelRenderer?.domElement) {
            this.labelRenderer.domElement.innerHTML = '';
        }
    }
    // 挂载应用级事件
    mountApplationEvent() {
        let lostContext = false;
        this.__webglcontextlost_fun_ = () => {
            lostContext = true;
        };
        // webgl 上下文丢失后 再切回该页面 刷新页面
        this.__window__visibilitychange__ = () => {
            if (lostContext) {
                window.location.reload();
            }
        };
        // webgl 上下文丢失事件
        this.canvas?.addEventListener('webglcontextlost', this.__webglcontextlost_fun_);
        document.addEventListener('visibilitychange', this.__window__visibilitychange__);
    }
    unMountApplationEvent() {
        if (this.__webglcontextlost_fun_) {
            this.canvas?.removeEventListener('webglcontextlost', this.__webglcontextlost_fun_);
        }
        if (this.__window__visibilitychange__) {
            document.removeEventListener('visibilitychange', this.__window__visibilitychange__);
        }
    }
    // 移除dom
    dispose() {
        this.unMountApplationEvent();
        this.renderer?.dispose();
        if (this.renderer?.domElement?.parentElement) {
            this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
        }
        if (this.labelRenderer?.domElement?.parentElement) {
            this.labelRenderer.domElement.parentElement.removeChild(this.labelRenderer.domElement);
        }
    }
}
exports.default = Application;
//# sourceMappingURL=index.js.map