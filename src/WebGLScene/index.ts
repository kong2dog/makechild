// 所有场景的基类

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

	constructor() {
		super();
		this.loadingPercent = 0;
		this.currentZoom = 1;
		this.needTransform = false;
	}

	// 生命周期 可被子类重写
	protected Init() {} // 后期需要预置一下参数

	// 生命周期 可被子类重写
	protected Create() {}

	// 生命周期 可被子类重写
	protected Update() {}

	// 生命周期 可被子类重写
	protected Destroy() {}

	init(renderer: THREE.WebGLRenderer, labelRenderer: CSS2DRenderer) {
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
		this.camera = new THREE.PerspectiveCamera(
			45,
			this.canvasWidth / this.canvasHeight,
			0.01,
			20000
		);
		this.camera.position.set(200, 200, 200);
		// 控制器
		this.controls = new OrbitControls(
			this.camera,
			this.labelRenderer.domElement
		);
		this.controls.mouseButtons = {
			LEFT: THREE.MOUSE.ROTATE,
			MIDDLE: THREE.MOUSE.DOLLY,
			RIGHT: THREE.MOUSE.PAN,
		};
		this.controls.target.set(0, 0, 0);
		// 相机管理器
		this.cameraManager = new CameraManager(this.controls);
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
		if (!this.camera) return;
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

	zoomCamera(flag: 'add' | 'reduce') {
		if (flag === 'add') {
			this.currentZoom *= 0.95;
		} else if (flag === 'reduce') {
			this.currentZoom /= 0.95;
		}
		this.cameraManager?.zoom(this.currentZoom);
	}
}
