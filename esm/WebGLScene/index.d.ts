import * as THREE from 'three';
import CameraManager from '../managers/CameraManager';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
export default class WebGLScene extends THREE.EventDispatcher {
    loadingPercent: number;
    currentZoom: number;
    needTransform: boolean;
    Scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer | null;
    labelRenderer?: CSS2DRenderer | null;
    canvasWidth?: number;
    canvasHeight?: number;
    camera?: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    controls?: OrbitControls;
    load?: Boolean;
    cameraManager?: CameraManager;
    constructor();
    protected Init(): void;
    protected Create(): void;
    protected Update(): void;
    protected Destroy(): void;
    init(renderer: THREE.WebGLRenderer, labelRenderer: CSS2DRenderer): void;
    render(): void;
    dispose(): void;
    resize(): void;
    zoomCamera(flag: 'add' | 'reduce'): void;
}
