import { WebGLScene, Figure, degreesToRadians } from '../src';
import * as THREE from 'three';
// Materials
const materialDarkest = new THREE.MeshPhongMaterial({ color: 0x33281b });
const materialDark = new THREE.MeshPhongMaterial({ color: 0x664e31 });
const materialLight= new THREE.MeshPhongMaterial({ color: 0xa3835b });
const steelMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
const skinMaterial = new THREE.MeshPhongMaterial({ 
  color: 0xffdbac,
  flatShading: false
});
export default class DemoScene extends WebGLScene {
	constructor() {
		super();
	}

	protected Create() {
		this.Scene.add(new THREE.AxesHelper(5000));
    this.createLight();
		this.camera.position.z = 5;
    const axe = this.creatAxe();
    this.Scene.add(axe)
	}

  protected creatAxe() {
    const axeHandleGeo = new THREE.BoxGeometry(7, 0.25, 0.25);
    const handle = new THREE.Mesh(axeHandleGeo, materialLight);
    const axeShape = new THREE.Shape();
    
    axeShape.moveTo(0, 0.15);
    axeShape.lineTo(1, 1);
    axeShape.lineTo(1.25, 0.5);
    axeShape.lineTo(1.25, -0.5);
    axeShape.lineTo(1, -1);
    axeShape.lineTo(0, -0.15);
    
    const extrudeSettings = {
      steps: 2,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 1
    };

    const axeGeo = new THREE.ExtrudeGeometry(axeShape, extrudeSettings);
    const buttGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
    const butt1 = new THREE.Mesh(buttGeo, steelMaterial);
    const butt2 = new THREE.Mesh(buttGeo, steelMaterial);
    const butt3 = new THREE.Mesh(buttGeo, steelMaterial);
    const axe1 = new THREE.Mesh(axeGeo, steelMaterial);
    const axe2 = new THREE.Mesh(axeGeo, steelMaterial);
    
    axe1.castShadow = true;
    axe2.castShadow = true;
    handle.castShadow = true;
    
    const group = new THREE.Group();
    
    group.add(handle);
    group.add(axe1);
    group.add(axe2);
    group.add(butt1);
    group.add(butt2);
    group.add(butt3);
    
    axe1.position.set(2.75, 0.4, 0)
    axe1.rotation.z = Math.PI / 2;
    axe2.position.set(2.75, -0.4, 0)
    axe2.rotation.z = -Math.PI / 2;
    butt2.position.set(-3.5, 0, 0);
    butt3.position.set(3.5, 0, 0);
    
    return group;
  }


	protected createLight() {
		const lightDirectional = new THREE.DirectionalLight(0xffffff, 1);
		this.Scene.add(lightDirectional);
		lightDirectional.position.set(5, 5, 5);
		const light = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.9);
		this.Scene.add(light)
	}

	protected Update() {}

	protected Destroy() {}
}
