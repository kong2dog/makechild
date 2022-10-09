import { WebGLScene } from '../src';
import * as THREE from 'three';

export default class DemoScene extends WebGLScene {
	constructor() {
		super();
	}

	protected Create() {
		this.Scene.add(new THREE.AxesHelper(5000));
		this.Scene.add(new THREE.AmbientLight('#ffffff'));
		const geometry = new THREE.ConeGeometry( 5, 20, 32 );
		const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
		const cone = new THREE.Mesh( geometry, material );
		this.Scene.add( cone );
	}

	protected Update() {}

	protected Destroy() {}
}
