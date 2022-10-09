import { WebGLScene, Figure, degreesToRadians } from '../src';
import * as THREE from 'three';

export default class DemoScene extends WebGLScene {
	constructor() {
		super();
	}

	protected Create() {
		this.Scene.add(new THREE.AxesHelper(5000));
		this.camera.position.z = 5;
		console.log(this.camera.position)
		// this.createShape();
		this.createLight();
		const figure = new Figure({x: 0, y: 0, z: 0, ry: degreesToRadians(35)});
		figure.init();
		new THREE.Box3().setFromObject(figure.group).getCenter(figure.group.position)
		this.Scene.add(figure.group);
	}

	protected createShape() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
		const mesh = new THREE.Mesh(geometry, material);
		this.Scene.add(mesh);
		console.log(this.Scene);
	}

	protected createLight() {
		const lightDirectional = new THREE.DirectionalLight(0xffffff, 1);
		this.Scene.add(lightDirectional);
		lightDirectional.position.set(5, 5, 5);
		const lightAmbient = new THREE.AmbientLight(0x9eaeff, 0.2)
		this.Scene.add(lightAmbient)
	}

	protected Update() {}

	protected Destroy() {}
}
