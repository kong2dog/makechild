import * as THREE from 'three';
export interface Params {
    x: number;
    y: number;
    z: number;
    ry: number;
}
export default class Figure {
    params: Params;
    group: THREE.Group;
    head: THREE.Group;
    headHue: number;
    bodyHue: number;
    headMaterial: THREE.MeshLambertMaterial;
    bodyMaterial: THREE.MeshLambertMaterial;
    constructor(params: Params);
    init(): void;
    createBody(): void;
    createHead(): void;
    createArms(): void;
    createEyes(): void;
    createLegs(): void;
}
