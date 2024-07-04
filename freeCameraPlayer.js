import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class FreeCameraPlayer {
    constructor(scene) {
        this.scene = scene;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 20);
        this.controls = new PointerLockControls(this.camera, document.body);
        this.speed = 5;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
        document.addEventListener('click', () => {
            this.controls.lock();
        });
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyG':
                this.direction.z = -100;
                break;
            case 'ArrowDown':
            case 'KeyT':
                this.direction.z = 100;
                break;
            case 'ArrowLeft':
            case 'KeyF':
                this.direction.x = -100;
                break;
            case 'ArrowRight':
            case 'KeyH':
                this.direction.x = 100;
                break;
            case 'KeyR':
                this.direction.y = -100;
                break;
            case 'KeyY':
                this.direction.y = 100;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyG':
            case 'ArrowDown':
            case 'KeyT':
                this.direction.z = 0;
                break;
            case 'ArrowLeft':
            case 'KeyF':
            case 'ArrowRight':
            case 'KeyH':
                this.direction.x = 0;
                break;
            case 'KeyR':
            case 'KeyY':
                this.direction.y = 0;
                break;
        }
    }

    update(delta) {
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= this.velocity.y * 10.0 * delta;

        this.velocity.x += this.direction.x * this.speed * delta;
        this.velocity.z += this.direction.z * this.speed * delta;
        this.velocity.y += this.direction.y * this.speed * delta;

        this.controls.moveRight(this.velocity.x * delta);
        this.controls.moveForward(this.velocity.z * delta);
        this.camera.position.y += this.velocity.y * delta;
    }
}
