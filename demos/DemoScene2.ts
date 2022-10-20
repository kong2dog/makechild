import { WebGLScene, Figure, degreesToRadians } from '../src';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
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

const settings = {
  legOptionsOpen: false,
  weaponOptionsOpen: false,
  武器: '斧',
  脸型: 1.5,
  身材: 2,
}
export default class DemoScene extends WebGLScene {
	constructor() {
		super();
	}

	protected Create() {
    this.createPanel();
		this.camera.position.set(0,0,12)
    this.draw();
    // this.Scene.add(new THREE.AxesHelper(5000));
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

  protected createPanel() {
    const gui = new GUI();
    gui.add( settings, '脸型', 1, 2 ).onChange(() => {
      this.draw();
    });
    gui.add( settings, '身材', 1.5, 2 ).onChange(() => {
      this.draw();
    });
    gui.add( settings, '武器', [ '斧', '剑' ]  ).onChange(() => {
      this.draw();
    });
  }

  protected createSword() {
    const handleGeo1 = new THREE.BoxGeometry(1.5, 0.25, 0.25);
    const handle1 = new THREE.Mesh(handleGeo1, materialLight);
    
    const handleGeo2 = new THREE.BoxGeometry(0.25, 2, 0.25);
    const handle2= new THREE.Mesh(handleGeo2, materialLight);
    
    const shape = new THREE.Shape();
    const extrudeSettings = {
      steps: 2,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 1
    };
    
    shape.moveTo(0, 0.1);
    shape.lineTo(4, 0.5);
    shape.lineTo(4.5, 0);
    shape.lineTo(4, -0.5);
    shape.lineTo(0, -0.1);
    
    const bladeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const blade = new THREE.Mesh(bladeGeo, steelMaterial);
    
    const group = new THREE.Group();
    
    handle1.position.set(-0.85, 0.0, 0);
    blade.position.set(0.5, 0, 0)
    
    handle1.castShadow = true;
    blade.castShadow = true;
    handle2.castShadow = true;
    
    group.add(blade);
    group.add(handle1);
    group.add(handle2);
    
    group.position.set(-0.5, 0, -0.05);
    group.rotation.x = Math.PI / 6;
    
    return group;
  }

  protected rightLeg() {
    const legGeo = new THREE.BoxGeometry(1.25, 1, 1.4);
    const legRight = new THREE.Mesh(legGeo, materialDark);
    
    const bootGeo1 = new THREE.BoxGeometry(1, 0.8, 1);
    const bootGeo2 = new THREE.BoxGeometry(1, 0.45, 1)
    
    const bootTopRight = new THREE.Mesh(bootGeo1, materialDarkest);
    const bootBottomRight = new THREE.Mesh(bootGeo2, materialDarkest);
    
    const group = new THREE.Group();
    
    legRight.castShadow = true;
    bootTopRight.castShadow = true;
    bootBottomRight.castShadow = true;
    
    legRight.position.set(0.75, -3.5, -0.35);
    
    group.add(legRight);
    group.add(bootTopRight);
    group.add(bootBottomRight);
  
    bootTopRight.position.set(0.75, -4.4, -0.35);
    bootBottomRight.position.set(0.75, -4.58, 0.1);
    
    return group;
  }

  addHead() {
    const headGeo = new THREE.BoxGeometry(settings['脸型'], 1.5, 1.2);
    const head = new THREE.Mesh(headGeo, skinMaterial);
    
    const browGeo = new THREE.BoxGeometry(settings['脸型'], 0.5, 0.5);
    const brow = new THREE.Mesh(browGeo, skinMaterial);
    
    const noseGeo = new THREE.BoxGeometry(0.35, 0.5, 0.5);
    const nose = new THREE.Mesh(noseGeo, skinMaterial);
   
    this.Scene.add(head);
    this.Scene.add(brow);
    this.Scene.add(nose);
    
    head.castShadow = true;
    head.receiveShadow = true;
    brow.castShadow = true;
    nose.castShadow = true;
    
    head.position.set(0, 2, 0);
    brow.position.set(0, 2.43 , 0.46);
    nose.position.set(0, 2.05, 0.54);
    
    brow.rotation.x = 130;
  }

  addBeard() {
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xcc613d,
      flatShading: true
    });
    
    const shape1 = new THREE.Shape();
    const shape2 = new THREE.Shape();
    const b1 = 1.5 / 2;
    const b2 = 1.5 + 0.5;
    shape1.moveTo(-b1, 0);
    shape1.bezierCurveTo(-0.75, -0.75, -0.5, -1, -0.15, -1.5);
    shape1.lineTo(-b2, -1.5);
    shape1.lineTo(-b2, 0);
    
    shape2.moveTo(-b1, 0);
    shape2.bezierCurveTo(-0.75, -0.75, -0.5, -1, -0.25, -1.25);
    shape2.lineTo(-b2, -1.25);
    shape2.lineTo(-b2, 0);
    
    
    const primarySettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: false
    };
    
    const secondarySettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: false
    };
    
    const primaryBeardGeo = new THREE.ExtrudeGeometry(shape1, primarySettings);
    const primaryBeard = new THREE.Mesh(primaryBeardGeo, material);
    
    const secondaryBeardGeo = new THREE.ExtrudeGeometry(shape2, secondarySettings);
    const secondaryBeardLeft = new THREE.Mesh(secondaryBeardGeo, material);
    const secondaryBeardRight = new THREE.Mesh(secondaryBeardGeo, material);
    
    this.Scene.add(primaryBeard);
    this.Scene.add(secondaryBeardLeft);
    this.Scene.add(secondaryBeardRight);
    
    primaryBeard.castShadow = true;
    secondaryBeardLeft.castShadow = true;
    secondaryBeardRight.castShadow = true;
    
    primaryBeard.position.set(0.5, 1.5, 1.65)
    secondaryBeardLeft.position.set(1.1, 1.4, 1.3)
    secondaryBeardRight.position.set(-0.18, 1.4, 1.55)
    
    primaryBeard.rotation.y = -Math.PI / 2;
    secondaryBeardLeft.rotation.y = -Math.PI / 2 + 0.25;
    secondaryBeardRight.rotation.y = -Math.PI / 2 - 0.25;
  }

  addMustache() {
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xcc613d,
      flatShading: true
    });
    
    const mustacheGeo = new THREE.BoxGeometry(0.6, 0.2, 0.25);
    const mustacheLeft = new THREE.Mesh(mustacheGeo, material);
    const mustacheRight = new THREE.Mesh(mustacheGeo, material);
    
    this.Scene.add(mustacheLeft);
    this.Scene.add(mustacheRight)
    
    mustacheLeft.position.set(-0.25, 1.55, 0.7);
    mustacheRight.position.set(0.25, 1.55, 0.7);
    
   
    mustacheLeft.rotation.z = Math.PI / 8;
    mustacheRight.rotation.z = -Math.PI / 8;
  }

  addHelmet() {
    const boneMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
    
    const helmetGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const helmet = new THREE.Mesh(helmetGeo, steelMaterial);
    
    const hornGeo = new THREE.BoxGeometry(1.1, 0.25, 0.25);
    const hornLeftBottom = new THREE.Mesh(hornGeo, boneMaterial);
    const hornLeftTop = new THREE.Mesh(hornGeo, boneMaterial);
    
    this.Scene.add(helmet);
    this.Scene.add(hornLeftBottom);
    this.Scene.add(hornLeftTop);
    
    helmet.position.set(0, 3, 0);
    hornLeftBottom.position.set(-0.75, 3.1, 0);
    hornLeftTop.position.set(-1.3, 3.6, 0);
    
    hornLeftTop.rotation.z = Math.PI / 2 + 0.25;
  }

  pegLeg() {
    const pegLegGeo = new THREE.BoxGeometry(0.5, 1.8, 0.5);
    const leg = new THREE.Mesh(pegLegGeo, materialLight);
    
    const stumpUpperGeo = new THREE.BoxGeometry(1, 0.75, 1);
    const stumpUpper = new THREE.Mesh(stumpUpperGeo, materialLight)
    
    const stumpMaterial = new THREE.MeshPhongMaterial({ color: 0x26211a });
    const stumpGeo = new THREE.BoxGeometry(0.6, 0.2, 0.6);
    const stump = new THREE.Mesh(stumpGeo, stumpMaterial);
    
    const group = new THREE.Group();
  
    stump.position.set(1, -4.65, -0.34)
    leg.position.set(1, -3.75, -0.35);
    stumpUpper.position.set(1, -3.1, -0.35);
    
    group.add(stump);
    group.add(leg);
    group.add(stumpUpper);
    
    return group;
  }

  draw() {
    this.Scene.remove.apply(this.Scene, this.Scene.children);
    this.addHead();
    this.addBeard();
    this.addMustache();
    this.addBody();
    this.addArms();
    this.addLegs();
    this.addWeapon();
    this.createLight();
    this.addPlane();
  }

  addBody() {
    const shape1 = new THREE.Shape();
    const shape2 = new THREE.Shape();
    const bodyw1 = settings['身材'];
    shape1.moveTo(-bodyw1, -0.5);
    shape1.lineTo(-1.5, -3.5);
    shape1.lineTo(1.5, -3.5);
    shape1.lineTo(bodyw1, -0.5);
    shape1.lineTo(bodyw1, 0);
    shape1.lineTo(bodyw1, 0.5);
    shape1.lineTo(-bodyw1, 0.5);
    shape1.lineTo(-bodyw1, 0);
    const bodyw2 = bodyw1 - 0.05;
    shape2.moveTo(-bodyw2, -0.5);
    shape2.lineTo(-1.5, -1.25);
    shape2.lineTo(1.5, -1.25);
    shape2.lineTo(bodyw2, -0.5);
    shape2.lineTo(bodyw2, 0);
    shape2.lineTo(bodyw2, 0.5);
    shape2.lineTo(-bodyw2, 0.5);
    shape2.lineTo(-bodyw2, 0)
    
    const extrudeSettings = {
      steps: 2,
      depth: 1.75,
      bevelEnabled: false
    };
    
    const bodyGeo = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
    const body = new THREE.Mesh(bodyGeo, skinMaterial);
    
    const upperBodyGeo = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
    const upperBody = new THREE.Mesh(upperBodyGeo, skinMaterial);
    
    const beltGeo = new THREE.BoxGeometry(3.5, 0.5, 2.1);
    const belt = new THREE.Mesh(beltGeo, steelMaterial);
    
    this.Scene.add(body);
    this.Scene.add(upperBody);
    this.Scene.add(belt);
    
    body.castShadow = true;
    upperBody.castShadow = true;
    belt.castShadow = true;
    
    upperBody.receiveShadow = true;
    body.receiveShadow = true;
    belt.receiveShadow = true;
  
    body.position.set(0, 0.75, -1.25);
    upperBody.position.set(0, 0.525, -1.155);
    belt.position.set(0, -2.5, -0.4);
    
    upperBody.rotation.x = -Math.PI / 24;
  }

  addLeftArm() {
    const bicepGeo = new THREE.BoxGeometry(2.5, 1, 1);
    const bicep = new THREE.Mesh(bicepGeo, skinMaterial);
    const foreArmGeo = new THREE.BoxGeometry(2.5, 1.25, 1.25);
    const foreArm = new THREE.Mesh(foreArmGeo, skinMaterial);
    
    this.Scene.add(bicep);
    this.Scene.add(foreArm);
    
    bicep.castShadow = true;
    foreArm.castShadow = true;
    
    bicep.position.set(-2, 0, 0.2);
    bicep.rotation.z = Math.PI / 4;
    bicep.rotation.y = Math.PI / 4;
    
    foreArm.position.set(-2.4, 0, 1.2);
    foreArm.rotation.z = -Math.PI / 2 - 0.3;
    foreArm.rotation.x = Math.PI / 8;
  }

  addRightArm() {
    const bicepGeo = new THREE.BoxGeometry(2.5, 1, 1);
    const bicep = new THREE.Mesh(bicepGeo, skinMaterial);
    const foreArmGeo = new THREE.BoxGeometry(2.5, 1.25, 1.25);
    const foreArm = new THREE.Mesh(foreArmGeo, skinMaterial);
    
    this.Scene.add(bicep);
    this.Scene.add(foreArm);
    
    bicep.castShadow = true;
    foreArm.castShadow = true;
    
    bicep.position.set(2, 0, -0.25);
    bicep.rotation.z = -Math.PI / 4;
    bicep.rotation.y = -Math.PI / 8;
    
    foreArm.position.set(2.4, -1.5, 0.42);
    foreArm.rotation.z = Math.PI / 2 - 0.3;
    foreArm.rotation.x = -Math.PI / 8;
  }

  addArms() {
    this.addLeftArm();
    this.addRightArm();
  }

  addLegs() {
    const pantsGeo = new THREE.BoxGeometry(3.25, 0.6, 1.8);
    const pants = new THREE.Mesh(pantsGeo, materialDark);
    
    const legGeo = new THREE.BoxGeometry(1.25, 1, 1.4);
    const legLeft = new THREE.Mesh(legGeo, materialDark);
    
    const bootGeo1 = new THREE.BoxGeometry(1, 0.8, 1);
    const bootGeo2 = new THREE.BoxGeometry(1, 0.45, 1)
    
    const bootTopLeft = new THREE.Mesh(bootGeo1, materialDarkest);
    const bootBottomLeft = new THREE.Mesh(bootGeo2, materialDarkest);
    
    this.Scene.add(pants);
    this.Scene.add(legLeft);
    this.Scene.add(this.rightLeg());
    this.Scene.add(bootTopLeft);
    this.Scene.add(bootBottomLeft);
    
    pants.castShadow = true;
    legLeft.castShadow = true;
    bootTopLeft.castShadow = true;
    bootBottomLeft.castShadow = true;
    
    pants.position.set(0, -2.75, -0.4);
    legLeft.position.set(-0.75, -3.5, -0.35);
    bootTopLeft.position.set(-0.75, -4.4, -0.35);
    bootBottomLeft.position.set(-0.75, -4.58, 0.1);
  }

  addWeapon() {
    const group = new THREE.Group();
    let weapon
    if(settings['武器'] === '斧'){
      weapon = this.creatAxe()
    }else{
      weapon = this.createSword()
    }
    group.add(weapon);
    
    this.Scene.add(group);
  
    group.position.set(-1.8, 1.5, 0);
    group.rotation.y = Math.PI / 2;
    group.rotation.x = Math.PI / 12;
  }

	protected createLight() {
		const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4);
    const light = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.9);

    this.Scene.add(light);
    this.Scene.add(directionalLight);
    
    directionalLight.position.set( 8, 8, 2 );
    directionalLight.castShadow = true;
    
    directionalLight.shadow.mapSize.width = 512;  // default
    directionalLight.shadow.mapSize.height = 512; // default
    directionalLight.shadow.camera.near = 0.5;    // default
    directionalLight.shadow.camera.far = 500;
	}

  addPlane() {
    const material = new THREE.ShadowMaterial({ color: 0x363636 });
    const planeGeo = new THREE.PlaneGeometry(20, 20, 32, 32);
    const plane = new THREE.Mesh(planeGeo, material)
    
    this.Scene.add(plane)
    
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0, -4.74, 0)
  }

	protected Update() {
    this.controls.update();
  }

	protected Destroy() {}
}
