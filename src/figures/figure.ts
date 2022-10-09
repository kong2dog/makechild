
import * as THREE from 'three';
import { random } from '../utils';
export interface Params {
  x: number,
  y: number,
  z: number,
  ry: number
}

export default class Figure {
  params: Params;
  group: THREE.Group;
  head: THREE.Group;
  headHue: number;
  bodyHue: number;
  headMaterial: THREE.MeshLambertMaterial;
  bodyMaterial: THREE.MeshLambertMaterial;
  constructor(params: Params) {
    this.params = params;
    this.group = new THREE.Group();
    this.group.position.set(this.params.x, this.params.y, this.params.z);
    this.group.rotation.y = this.params.ry;
    // Create a new group for the head
    this.head = new THREE.Group()
    this.headHue = random(0, 360);
    this.bodyHue = random(0, 360);
    this.headMaterial = new THREE.MeshLambertMaterial({ color: `hsl(${this.headHue}, 30%, 50%` })
		this.bodyMaterial = new THREE.MeshLambertMaterial({ color: `hsl(${this.bodyHue}, 85%, 50%)` })
  }

  init() {
    this.createBody()
    this.createHead()
    this.createArms()
    this.createLegs();
    this.createEyes();
  }

  createBody() {
    const geometry = new THREE.BoxGeometry(1, 1.5, 1)
		const body = new THREE.Mesh(geometry, this.bodyMaterial)
		this.group.add(body)
  }

  createHead() {
    
    // Create the main cube of the head and add to the group
    const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4)
    const headMain = new THREE.Mesh(geometry, this.headMaterial)
    this.head.add(headMain)
    
    // Add the head group to the figure
    this.group.add(this.head)
    
    // Position the head group
    this.head.position.y = 1.65
    
    // Add the eyes by calling the function we already made
    this.createEyes()
  }

  createArms() {
    const height = 1
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
	
    for(let i = 0; i < 2; i++) {
      const arm = new THREE.Mesh(geometry, material)
      const m = i % 2 === 0 ? 1 : -1
      
      // Create group for each arm
      const armGroup = new THREE.Group()
      
      // Add the arm to the group
      armGroup.add(arm)
      
      // Add the arm group to the figure
      this.group.add(armGroup)
      
      // Translate the arm (not the group) downwards by half the height
      arm.position.y = height * -0.5
      
      armGroup.position.x = m * 0.8
      armGroup.position.y = 0.6
      
      // Helper
      const box = new THREE.BoxHelper(armGroup, 0xffff00)
      this.group.add(box)
    }
  }

  createEyes() {
    const eyes = new THREE.Group()
    const geometry = new THREE.SphereGeometry(0.15, 12, 8)
    
    // Define the eye material
    const material = new THREE.MeshLambertMaterial({ color: 0x44445c })
    
    for(let i = 0; i < 2; i++) {
      const eye = new THREE.Mesh(geometry, material)
      const m = i % 2 === 0 ? 1 : -1
      
      // Add the eye to the group
      eyes.add(eye)
      
      // Position the eye
      eye.position.x = 0.36 * m
    }
    this.head.add(eyes)

    // Move the eyes forwards by half of the head depth - it might be a good idea to create a variable to do this!
    eyes.position.z = 0.7
  }

  createLegs() {
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const legs = new THREE.Group()
    const geometry = new THREE.BoxGeometry(0.25, 0.4, 0.25)
    
    for(let i = 0; i < 2; i++) {
      const leg = new THREE.Mesh(geometry, material)
      const m = i % 2 === 0 ? 1 : -1
      
      legs.add(leg)
      leg.position.x = m * 0.22
    }
    
    this.group.add(legs)
    legs.position.y = -1.15
  }
}