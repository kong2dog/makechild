import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Manager from './Manager';
declare type EasingFunction = (amount: number) => number;
export default class CameraManager extends Manager {
    controls: OrbitControls;
    camera: THREE.Camera;
    isMoving: boolean;
    spherical?: null;
    defaultDistance: number;
    defaultZoom: number;
    constructor(controls: OrbitControls);
    update(): void;
    Create(): void;
    Destroy(): void;
    private getBestViewCameraPosition;
    setCamera(box3: THREE.Box3, vector: THREE.Vector3 | undefined, isMoving: boolean, scale?: number, up?: boolean): void;
    zoom(zoomLevel: number, easing?: boolean): void;
    zoomAdd(zoomLevel: number, easing?: boolean): void;
    panCamera(target: THREE.Vector3): void;
    moveCamera(min: THREE.Vector3, max: THREE.Vector3, target: THREE.Vector3, vector?: THREE.Vector3, scale?: number): void;
    /**
     *相机移动
     * @param {*} position 相机所在位置
     * @param {*} target 目标模型的位置
     * @param {*} easing 动画类型，参考node_modules/@tweenjs/tween.js/dist/tween.cjs.js里面类型，如Tween.Easing.Quadratic.Out
     * @returns
     */
    move(position: THREE.Vector3, target: THREE.Vector3, easing?: EasingFunction): void;
    autoRotateOpen(): void;
    autoRotateClose(): void;
    getOutlinePoint(min: THREE.Vector3, max: THREE.Vector3, target: THREE.Vector3, vec: THREE.Vector3, scale: number): THREE.Vector3;
}
export {};
