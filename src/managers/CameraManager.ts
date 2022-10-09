import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Tween from '@tweenjs/tween.js';

import Manager from './Manager';
declare type EasingFunction = (amount: number) => number;

export default class CameraManager extends Manager {
	controls: OrbitControls;
	camera: THREE.Camera;
	isMoving: boolean;
	spherical?: null;
	defaultDistance!: number;
	defaultZoom!: number;
	constructor(controls: OrbitControls) {
		super();
		this.controls = controls;
		this.camera = controls.object as THREE.PerspectiveCamera;
		this.isMoving = false;
	}

	update() {
		Tween.update();
	}

	Create() {}

	Destroy() {}

	private getBestViewCameraPosition(
		box3: THREE.Box3,
		vector = new THREE.Vector3(0, 1, 0),
		scale: number,
		up?: boolean
	): THREE.Vector3 {
		const height = Math.abs(box3.max.z - box3.min.z) / 2;
		const width = Math.abs(box3.max.x - box3.min.x) / 2;
		let radius, distance;

		if (
			this.camera instanceof THREE.PerspectiveCamera &&
			width / height > this.camera.aspect
		) {
			radius = height * this.camera.aspect;
		} else {
			radius = height;
		}

		if (up) {
			if (
				this.camera instanceof THREE.PerspectiveCamera &&
				width / height > this.camera.aspect
			) {
				radius = width / this.camera.aspect; // 根据长周计算相机距离
			} else {
				radius = height;
			}
			box3.min.y = Math.max(box3.min.y, box3.max.y);
			box3.max.y = box3.min.y;
		}

		const target = new THREE.Vector3()
			.addVectors(box3.min, box3.max)
			.multiplyScalar(0.5);
		distance = radius;
		if (this.camera instanceof THREE.PerspectiveCamera) {
			const fov = THREE.MathUtils.degToRad(this.camera.getEffectiveFOV());
			distance = radius / Math.tan(fov / 2);
		}
		const newPosition = new THREE.Vector3()
			.copy(target)
			.add(vector.multiplyScalar(distance * scale));
		return newPosition;
	}

	setCamera(
		box3: THREE.Box3,
		vector = new THREE.Vector3(0, 1, 0),
		isMoving: boolean,
		scale = 1,
		up?: boolean
	) {
		if (this.isMoving) {
			return;
		}
		const target = new THREE.Vector3()
			.addVectors(box3.min, box3.max)
			.multiplyScalar(0.5);
		const newPosition = this.getBestViewCameraPosition(box3, vector, scale, up);
		if (isMoving) {
			this.move(newPosition, target);
		} else {
			this.controls.target.copy(target);
			this.controls.object.position.set(
				newPosition.x,
				newPosition.y,
				newPosition.z
			);
		}
		if (this.camera instanceof THREE.PerspectiveCamera) {
			this.defaultDistance = this.controls.getDistance();
		} else if (this.camera instanceof THREE.OrthographicCamera) {
			this.defaultZoom = this.camera.zoom;
		}
	}

	zoom(zoomLevel: number, easing = true) {
		const offset = new THREE.Vector3();
		offset.copy(this.camera.position).sub(this.controls.target);
		const distance = this.controls.getDistance();
		offset.setLength(distance * zoomLevel);
		if (this.camera instanceof THREE.PerspectiveCamera) {
			if (easing) {
				this.move(
					new THREE.Vector3().copy(this.controls.target).add(offset),
					this.controls.target
				);
			} else {
				this.camera.position.copy(this.controls.target).add(offset);
			}
			this.controls.update();
		} else if (this.camera instanceof THREE.OrthographicCamera) {
			let zoom = this.camera.zoom / +zoomLevel;
			if (zoom < this.controls.minZoom) {
				zoom = this.controls.minZoom;
			}
			if (zoom > this.controls.maxZoom) {
				zoom = this.controls.maxZoom;
			}
			this.camera.zoom = zoom;
			this.camera.updateProjectionMatrix();
		}
	}

	// 缩放逻辑处理
	zoomAdd(zoomLevel: number, easing = true) {
		const offset = new THREE.Vector3();
		offset.copy(this.camera.position).sub(this.controls.target);
		const distance = this.controls.getDistance();
		offset.setLength(
			this.defaultDistance / (this.defaultDistance / distance + zoomLevel)
		);
		if (this.camera instanceof THREE.PerspectiveCamera) {
			if (easing) {
				this.move(
					new THREE.Vector3().copy(this.controls.target).add(offset),
					this.controls.target
				);
			} else {
				this.camera.position.copy(this.controls.target).add(offset);
			}
			this.controls.update();
		} else if (this.camera instanceof THREE.OrthographicCamera) {
			let zoom = this.camera.zoom + zoomLevel * this.defaultZoom;
			if (zoom < this.controls.minZoom) {
				zoom = this.controls.minZoom;
			}
			if (zoom > this.controls.maxZoom) {
				zoom = this.controls.maxZoom;
			}
			this.camera.zoom = zoom;
			this.camera.updateProjectionMatrix();
		}
	}

	panCamera(target: THREE.Vector3) {
		const vector = new THREE.Vector3().subVectors(
			this.camera.position,
			this.controls.target
		);
		const newPosition = new THREE.Vector3().addVectors(target, vector);
		if (this.isMoving) {
			return;
		}
		this.isMoving = true;
		const allEndList = [],
			isEnd = (end: number) => {
				allEndList.push(end);
				if (allEndList.length === 2) {
					// 表示所有动画结束
					this.isMoving = false;
				}
			};
		// 计算相机的位置

		const time1 = 1000;
		const prePosition = {
			x: this.camera.position.x,
			y: this.camera.position.y,
			z: this.camera.position.z,
		};
		const tween1 = new Tween.Tween(prePosition)
			.to(
				{
					x: newPosition.x,
					y: newPosition.y,
					z: newPosition.z,
				},
				time1
			)
			.easing(Tween.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.camera.position.x = prePosition.x;
				this.camera.position.y = prePosition.y;
				this.camera.position.z = prePosition.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(1);
			});

		const time2 = 1000,
			preTarget = {
				x: this.controls.target.x,
				y: this.controls.target.y,
				z: this.controls.target.z,
			};
		const tween2 = new Tween.Tween(preTarget)
			.to(
				{
					x: target.x,
					y: target.y,
					z: target.z,
				},
				time2
			)
			.easing(Tween.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.controls.target.x = preTarget.x;
				this.controls.target.y = preTarget.y;
				this.controls.target.z = preTarget.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(2);
			});
		tween1.start();
		tween2.start();
	}

	moveCamera(
		min: THREE.Vector3,
		max: THREE.Vector3,
		target: THREE.Vector3,
		vector = new THREE.Vector3(1, 1, 1),
		scale = 2.5
	) {
		if (this.isMoving) {
			return;
		}
		this.isMoving = true;
		const allEndList = [],
			isEnd = (end: number) => {
				allEndList.push(end);
				if (allEndList.length === 2) {
					// 表示所有动画结束
					this.isMoving = false;
				}
			};
		// 计算相机的位置
		const newPosition = this.getOutlinePoint(min, max, target, vector, scale);
		const time1 = 1000;
		const prePosition = {
			x: this.camera.position.x,
			y: this.camera.position.y,
			z: this.camera.position.z,
		};
		const tween1 = new Tween.Tween(prePosition)
			.to(
				{
					x: newPosition.x,
					y: newPosition.y,
					z: newPosition.z,
				},
				time1
			)
			.easing(Tween.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.camera.position.x = prePosition.x;
				this.camera.position.y = prePosition.y;
				this.camera.position.z = prePosition.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(1);
			});

		const time2 = 1000,
			preTarget = {
				x: this.controls.target.x,
				y: this.controls.target.y,
				z: this.controls.target.z,
			};
		const tween2 = new Tween.Tween(preTarget)
			.to(
				{
					x: target.x,
					y: target.y,
					z: target.z,
				},
				time2
			)
			.easing(Tween.Easing.Cubic.InOut)
			.onUpdate(() => {
				this.controls.target.x = preTarget.x;
				this.controls.target.y = preTarget.y;
				this.controls.target.z = preTarget.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(2);
			});
		tween1.start();
		tween2.start();
	}

	/**
	 *相机移动
	 * @param {*} position 相机所在位置
	 * @param {*} target 目标模型的位置
	 * @param {*} easing 动画类型，参考node_modules/@tweenjs/tween.js/dist/tween.cjs.js里面类型，如Tween.Easing.Quadratic.Out
	 * @returns
	 */
	move(
		position: THREE.Vector3,
		target: THREE.Vector3,
		easing?: EasingFunction
	) {
		const tweenEasing = easing || Tween.Easing.Cubic.InOut;
		if (this.isMoving) {
			return;
		}
		this.isMoving = true;
		const allEndList = [],
			isEnd = (end: number) => {
				allEndList.push(end);
				if (allEndList.length === 2) {
					// 表示所有动画结束
					this.isMoving = false;
				}
			};

		const time1 = 1000,
			prePosition = {
				x: this.camera.position.x,
				y: this.camera.position.y,
				z: this.camera.position.z,
			};
		const tween1 = new Tween.Tween(prePosition)
			.to(
				{
					x: position.x,
					y: position.y,
					z: position.z,
				},
				time1
			)
			.easing(tweenEasing)
			.onUpdate(() => {
				this.camera.position.x = prePosition.x;
				this.camera.position.y = prePosition.y;
				this.camera.position.z = prePosition.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(1);
			});
		const time2 = 1000,
			preTarget = {
				x: this.controls.target.x,
				y: this.controls.target.y,
				z: this.controls.target.z,
			};

		const tween2 = new Tween.Tween(preTarget)
			.to(
				{
					x: target.x,
					y: target.y,
					z: target.z,
				},
				time2
			)
			.easing(tweenEasing)
			.onUpdate(() => {
				this.controls.target.x = preTarget.x;
				this.controls.target.y = preTarget.y;
				this.controls.target.z = preTarget.z;
				this.controls.update();
			})
			.onComplete(() => {
				isEnd(2);
			});

		tween1.start();
		tween2.start();
	}

	// 自动旋转开启
	autoRotateOpen() {
		this.controls.autoRotate = true;
	}

	// 自动旋转关闭
	autoRotateClose() {
		this.controls.autoRotate = false;
	}

	getOutlinePoint(
		min: THREE.Vector3,
		max: THREE.Vector3,
		target: THREE.Vector3,
		vec: THREE.Vector3,
		scale: number
	) {
		const length = new THREE.Vector3().subVectors(max, min).length();

		const vector = new THREE.Vector3().copy(vec).normalize();
		vector.multiplyScalar(length * scale);
		return new THREE.Vector3().copy(target).add(vector);
	}
}
