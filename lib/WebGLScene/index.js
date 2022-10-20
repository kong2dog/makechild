"use strict";
// 所有场景的基类
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
const THREE = __importStar(require("three"));
const CameraManager_1 = __importDefault(require("../managers/CameraManager"));
const OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
class WebGLScene extends THREE.EventDispatcher {
    constructor() {
        super();
        this.loadingPercent = 0;
        this.currentZoom = 1;
        this.needTransform = false;
    }
    // 生命周期 可被子类重写
    Init() { } // 后期需要预置一下参数
    // 生命周期 可被子类重写
    Create() { }
    // 生命周期 可被子类重写
    Update() { }
    // 生命周期 可被子类重写
    Destroy() { }
    init(renderer, labelRenderer) {
        this.Init();
        // 创建 webglrender
        this.renderer = renderer;
        this.labelRenderer = labelRenderer;
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color('#ffffff');
        const size = new THREE.Vector2();
        renderer.getSize(size);
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        this.camera = new THREE.PerspectiveCamera(75, this.canvasWidth / this.canvasHeight, 0.01, 2000);
        // 控制器
        this.controls = new OrbitControls_js_1.OrbitControls(this.camera, this.labelRenderer.domElement);
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
        };
        this.controls.target.set(0, 0, 0);
        // 相机管理器
        this.cameraManager = new CameraManager_1.default(this.controls);
        this.Create();
    }
    // 应用层调用 render
    render() {
        this.Update();
        this.cameraManager?.update();
        if (this.Scene && this.renderer && this.camera) {
            this.renderer.render(this.Scene, this.camera);
        }
        if (this.Scene && this.labelRenderer && this.camera) {
            this.labelRenderer.render(this.Scene, this.camera);
        }
    }
    // 主动销毁
    dispose() {
        this.Destroy();
        // 销毁相机
        // this.cameraManager.dispose()
        this.Scene?.clear();
    }
    resize() {
        const size = new THREE.Vector2();
        this.renderer?.getSize(size);
        this.canvasWidth = size.width;
        this.canvasHeight = size.height;
        if (!this.camera)
            return;
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
        }
        if (this.camera instanceof THREE.OrthographicCamera) {
            this.camera.left = -this.canvasWidth / 2;
            this.camera.right = this.canvasWidth / 2;
            this.camera.top = this.canvasHeight / 2;
            this.camera.bottom = -this.canvasHeight / 2;
        }
        this.camera.updateProjectionMatrix();
        this.render();
    }
    zoomCamera(flag) {
        if (flag === 'add') {
            this.currentZoom *= 0.95;
        }
        else if (flag === 'reduce') {
            this.currentZoom /= 0.95;
        }
        this.cameraManager?.zoom(this.currentZoom);
    }
}
exports.default = WebGLScene;
//# sourceMappingURL=index.js.map