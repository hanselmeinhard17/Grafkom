import * as THREE from "three";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


export class Player {
    constructor(camera, controller, scene, speed) {
        this.camera = camera;
        this.controller = controller;
        this.scene = scene;
        this.speed = speed; 
        this.rotationVector = new THREE.Vector3();
        this.animations = {};
        this.state = 'idle';

        // Log posisi kamera awal
        this.camera.setup(new THREE.Vector3(0, 5, 20), this.rotationVector);

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0, 0, 0),
            new THREE.MeshPhongMaterial({ color: 0xFF1111 })
        );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        this.loadModel();
        this.boundingBox = new THREE.Box3();
        this.collisionObjects = [];
        this.previousPosition = new THREE.Vector3();
    }
 
    loadModel() {
        var loader = new FBXLoader();
        loader.setPath('/FBX/');
        loader.load('robert.fbx', (fbx) => {
            fbx.scale.setScalar(0.038);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            this.mesh = fbx;    
            this.scene.add(this.mesh);
            this.mesh.rotation.y = -Math.PI / 2;

            this.mixer = new THREE.AnimationMixer(this.mesh);
            var onLoad = (animName, anim) => {
                var clip = anim.animations[0];
                var action = this.mixer.clipAction(clip);
                this.animations[animName] = {
                    clip: clip,
                    action: action
                };
            };
            var loader = new FBXLoader();
            loader.setPath('/animasi/');
            
            loader.load('Boxing (2).fbx', (fbx) => onLoad('idle', fbx));
            loader.load('Walking.fbx', (fbx) => onLoad('run', fbx));
            loader.load('Walking Backwards.fbx', (fbx) => onLoad('run2', fbx));
            loader.load('Victory2.fbx', (fbx) => onLoad('Action', fbx));
        });
    }

    update(dt) {
        if (!this.mesh) { return; }
        var direction = new THREE.Vector3(0, 0, 0);
        if (this.controller.keys['foward']) {
            direction.x = 2;
        }
        if (this.controller.keys['backward']) {
            direction.x = -2;
        }
        if (this.controller.keys['left']) {
            direction.z = -2;
        }
        if (this.controller.keys['right']) {
            direction.z = 2;
        }
        if (this.controller.keys['action']) {
            direction.z = 0.00001;
        }

        if (direction.length() === 0) {
            if (this.animations['idle']) {
                if (this.state !== 'idle') {
                    this.mixer.stopAllAction();
                    this.state = 'idle';
                }
                this.mixer.clipAction(this.animations['idle'].clip).play();
                this.mixer.update(dt);
            }
        } else {
            if (this.controller.keys['backward']) {
                if (this.animations['run']) {
                    if (this.state !== 'run') {
                        this.mixer.stopAllAction();
                        this.state = 'run';
                    }
                    this.mixer.clipAction(this.animations['run'].clip).play();
                    this.mixer.update(dt);
                }
            }
        }
        if (this.controller.keys['foward']) {
            if (this.animations['run2']) {
                if (this.state !== 'run2') {
                    this.mixer.stopAllAction();
                    this.state = 'run2';
                }
                this.mixer.clipAction(this.animations['run2'].clip).play();
                this.mixer.update(dt);
            }
        }

        if (this.controller.keys['action']) {
            if (this.animations['Action']) {
                if (this.state !== 'Action') {
                    this.mixer.stopAllAction();
                    this.state = 'Action';
                }
                this.mixer.clipAction(this.animations['Action'].clip).play();
                this.mixer.update(dt);
            }
        }
       
        if (this.controller.mouseDown) {
            var dtMouse = this.controller.deltaMousePos;
            dtMouse.x = dtMouse.x / Math.PI;
            dtMouse.y = dtMouse.y / Math.PI;

            this.rotationVector.y += dtMouse.x * 800 * dt;
            this.rotationVector.z += dtMouse.y * 800 * dt;
            
            this.mesh.rotation.y = this.rotationVector.y;
            this.mesh.rotation.z = this.rotationVector.z;
        }

        var fowardVector = new THREE.Vector3(1, 0, 0);
        var rightVector = new THREE.Vector3(0, 0, 1);

        this.previousPosition.copy(this.mesh.position);

        fowardVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);
        rightVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);

        this.mesh.position.add(fowardVector.multiplyScalar(dt * this.speed * direction.x));
        this.mesh.position.add(rightVector.multiplyScalar(dt * this.speed * direction.z));

        this.camera.setup(this.mesh.position, this.rotationVector);

        // Log posisi kamera setiap update
       

        this.checkCollisions();
    }

    checkCollisions() {
        this.boundingBox.setFromObject(this.mesh);
        for (let object of this.collisionObjects) {
            if (object.boundingBox && this.boundingBox.intersectsBox(object.boundingBox)) {
                console.log('Collision detected with', object.name);
                this.mesh.position.copy(this.previousPosition);
                break;
            }
        }
    }

    setCollisionObjects(objects) {
        this.collisionObjects = objects;
    }
}

export class Player2{
    constructor(camera, controller, scene, speed) {
        this.camera = camera;
        this.controller = controller;
        this.scene = scene;
        this.speed = speed; 
        this.rotationVector = new THREE.Vector3();
        this.animations = {};
        this.state = 'idle';

        // Log posisi kamera awal
        
        this.camera.setup(new THREE.Vector3(0, 5, 20), this.rotationVector);

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0, 0, 0),
            new THREE.MeshPhongMaterial({ color: 0xFF1111 })
        );
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        this.loadModel();
        this.boundingBox = new THREE.Box3();
        this.collisionObjects = [];
        this.previousPosition = new THREE.Vector3();
    }

    
    switchCameraMode() {
        this.isFirstPerson = !this.isFirstPerson;
        
    }

    loadModel() {
        var loader = new FBXLoader();
        loader.setPath('/FBX/');
        loader.load('hansel.fbx', (fbx) => {
            fbx.scale.setScalar(0.0037);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            this.mesh = fbx;    
            this.scene.add(this.mesh);
            this.mesh.rotation.y = -Math.PI / -2;

            this.mixer = new THREE.AnimationMixer(this.mesh);
            var onLoad = (animName, anim) => {
                var clip = anim.animations[0];
                var action = this.mixer.clipAction(clip);
                this.animations[animName] = {
                    clip: clip,
                    action: action
                };
            };
            var loader = new FBXLoader();
            loader.setPath('/animasi/');
            
            loader.load('Boxing.fbx', (fbx) => onLoad('idle', fbx));
            loader.load('Long Step Forward.fbx', (fbx) => onLoad('run', fbx));
            loader.load('Step Backward.fbx', (fbx) => onLoad('run2', fbx));
            loader.load('Long Right Side Step.fbx', (fbx) => onLoad('run3', fbx));
            loader.load('Long Left Side Step.fbx', (fbx) => onLoad('run4', fbx));
            loader.load('Dying Backwards.fbx', (fbx) => onLoad('Action', fbx));
         
        });
    }
    update(dt) {
        if (!this.mesh) { return; }
        var direction = new THREE.Vector3(0, 0, 0);
        if (this.controller.keys['foward']) {
            direction.x = 2;
        }
        if (this.controller.keys['backward']) {
            direction.x = -2;
        }
        if (this.controller.keys['left']) {
            direction.z = -2;
        }
        if (this.controller.keys['right']) {
            direction.z = 2;
        }
        if (this.controller.keys['action']) {
            direction.z = 0.00001;
        }
    
        if (direction.length() === 0) {
            if (this.animations['idle']) {
                if (this.state !== 'idle') {
                    this.mixer.stopAllAction();
                    this.state = 'idle';
                }
                this.mixer.clipAction(this.animations['idle'].clip).play();
                this.mixer.update(dt);
            }
        } else {
            if (this.controller.keys['left']) {
                if (this.animations['run']) {
                    if (this.state !== 'run') {
                        this.mixer.stopAllAction();
                        this.state = 'run';
                    }
                    this.mixer.clipAction(this.animations['run'].clip).play();
                    this.mixer.update(dt);
                }
            }
            if (this.controller.keys['right']) {
            if (this.animations['run2']) {
                if (this.state !== 'run2') {
                    this.mixer.stopAllAction();
                    this.state = 'run2';
                }
                this.mixer.clipAction(this.animations['run2'].clip).play();
                this.mixer.update(dt);
            }
        }
        if (this.controller.keys['forward']) {
            if (this.animations['run3']) {
                if (this.state !== 'run3') {
                    this.mixer.stopAllAction();
                    this.state = 'run3';
                }
                this.mixer.clipAction(this.animations['run3'].clip).play();
                this.mixer.update(dt);
            }
        }
        if (this.controller.keys['backward']) {
            if (this.animations['run4']) {
                if (this.state !== 'run4') {
                    this.mixer.stopAllAction();
                    this.state = 'run4';
                }
                this.mixer.clipAction(this.animations['run4'].clip).play();
                this.mixer.update(dt);
            }
        }

        if (this.controller.keys['action']) {
            if (this.animations['Action']) {
                if (this.state !== 'Action') {
                    this.mixer.stopAllAction();
                    this.state = 'Action';
                }
                this.mixer.clipAction(this.animations['Action'].clip).play();
                this.mixer.update(dt);
            }
        }
        }
        
    
        if (this.controller.mouseDown) {
            var dtMouse = this.controller.deltaMousePos;
            dtMouse.x = dtMouse.x / Math.PI;
            dtMouse.y = dtMouse.y / Math.PI;

            this.rotationVector.y += dtMouse.x * 800 * dt;
            this.rotationVector.z += dtMouse.y * 800 * dt;
            this.mesh.rotation.y = this.rotationVector.y;
            
        }

        var fowardVector = new THREE.Vector3(1, 0, 0);
        var rightVector = new THREE.Vector3(0, 0, 1);

        this.previousPosition.copy(this.mesh.position);

        fowardVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);
        rightVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationVector.y);

        this.mesh.position.add(fowardVector.multiplyScalar(dt * this.speed * direction.x));
        this.mesh.position.add(rightVector.multiplyScalar(dt * this.speed * direction.z));

        this.camera.setup(this.mesh.position, this.rotationVector);

        this.checkCollisions();
    }

    checkCollisions() {
        this.boundingBox.setFromObject(this.mesh);
        for (let object of this.collisionObjects) {
            if (object.boundingBox && this.boundingBox.intersectsBox(object.boundingBox)) {
                console.log('Collision detected with', object.name);
                this.mesh.position.copy(this.previousPosition);
                break;
            }
        }
    }

    setCollisionObjects(objects) {
        this.collisionObjects = objects;
    }
}



export class PlayerController {
    constructor() {
        this.keys = {
            "foward": false,
            "backward": false,
            "left": false,
            "right": false,
            "action": false
        };
        this.mousePos = new THREE.Vector2();
        this.mouseDown = false;
        this.deltaMousePos = new THREE.Vector2();
        document.addEventListener('keydown', (e) => this.onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this.onKeyUp(e), false);
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
        document.addEventListener('mouseup', (e) => this.onMouseUp(e), false);
        document.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
    }

    onMouseDown(event) {
        this.mouseDown = true;
    }
    
    onMouseUp(event) {
        this.mouseDown = false;
    }
    
    onMouseMove(event) {
        var currentMousePos = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
        this.deltaMousePos.addVectors(currentMousePos, this.mousePos.multiplyScalar(-1));
        this.mousePos.copy(currentMousePos);
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'W':
            case 'w': this.keys['foward'] = true; break;
            case 'S':
            case 's': this.keys['backward'] = true; break;
            case 'A':
            case 'a': this.keys['left'] = true; break;
            case 'D':
            case 'd': this.keys['right'] = true; break;    
            case 'Z':
            case 'z': this.keys['action'] = true; break;
           
        }
    }
    
    onKeyUp(event) {
        switch (event.key) {
            case 'W':
            case 'w': this.keys['foward'] = false; break;
            case 'S':
            case 's': this.keys['backward'] = false; break;
            case 'A':
            case 'a': this.keys['left'] = false; break;
            case 'D':
            case 'd': this.keys['right'] = false; break;  
            case 'Z':
            case 'z': this.keys['action'] = false; break;
          
        }
    }
}

export class PlayerController2 {
    constructor() {
        this.keys = {
            "foward": false,
            "backward": false,
            "left": false,
            "right": false,
            "action": false
        };
        this.mousePos = new THREE.Vector2();
        this.mouseDown = false;
        this.deltaMousePos = new THREE.Vector2();
        document.addEventListener('keydown', (e) => this.onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this.onKeyUp(e), false);
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
        document.addEventListener('mouseup', (e) => this.onMouseUp(e), false);
        document.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
    }

    onMouseDown(event) {
        this.mouseDown = true;
    }
    
    onMouseUp(event) {
        this.mouseDown = false;
    }
    
    onMouseMove(event) {
        var currentMousePos = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );
        this.deltaMousePos.addVectors(currentMousePos, this.mousePos.multiplyScalar(-1));
        this.mousePos.copy(currentMousePos);
    }

    onKeyDown(event) {
        switch (event.key) {
            
            case 'I':
            case 'i': this.keys['foward'] = true; break;
            case 'K':
            case 'k': this.keys['backward'] = true; break;
            case 'J':
            case 'j': this.keys['left'] = true; break;
            case 'L':
            case 'l': this.keys['right'] = true; break; 
            case 'X':
            case 'x': this.keys['action'] = true; break;
        }
    }
    
    onKeyUp(event) {
        switch (event.key) {
            case 'I':
            case 'i': this.keys['foward'] = false; break;
            case 'K':
            case 'k': this.keys['backward'] = false; break;
            case 'J':
            case 'j': this.keys['left'] = false; break;
            case 'L':
            case 'l': this.keys['right'] = false; break; 
             case 'X':
            case 'x': this.keys['action'] = false; break;
        }
    }
}


export class ThirdPersonCamera {
    constructor(camera, positionOffset, targetOffset) {
        this.camera = camera;
        this.positionOffset = positionOffset;
        this.targetOffset = targetOffset;
        this.velocity = new THREE.Vector3();
        
        this.controls = new PointerLockControls(this.camera, document.body);

        // Bind the event handlers
        this.bindEvents();
        this.controls.lock();
        
    }

    bindEvents() {
        document.addEventListener('click', () => {
            this.controls.lock();
        });

        this.controls.addEventListener('lock', () => {
            console.log('PointerLockControls: Locked');
        });

        this.controls.addEventListener('unlock', () => {
            console.log('PointerLockControls: Unlocked');
        });
    }

    setup(target, angle) {
        var temp = new THREE.Vector3();
        temp.copy(this.positionOffset);
        temp.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle.y);
        temp.applyAxisAngle(new THREE.Vector3(0, 0, 1), angle.z);
        temp.addVectors(target, temp);

        
        
        this.camera.position.copy(temp);

        temp = new THREE.Vector3();
        temp.addVectors(target, this.targetOffset);
        this.camera.lookAt(temp);

        // Log posisi kamera setelah setup
        
    }

    update(delta) {
        // Update PointerLockControls
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

export class FirstPersonCamera {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;
        this.isOnObject = false;
        this.jumpHeight = 350;

        this.controls = new PointerLockControls(this.camera, document.body);
        this.controls.addEventListener('lock', () => console.log('PointerLockControls: Locked'));
        this.controls.addEventListener('unlock', () => console.log('PointerLockControls: Unlocked'));

        this.bindEvents();
        this.controls.lock();
    }

    bindEvents() {
        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
        document.addEventListener('click', () => this.controls.lock());
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.moveForward = true;
                break;
            case 'ArrowLeft':
            case 'a':
                this.moveLeft = true;
                break;
            case 'ArrowDown':
            case 's':
                this.moveBackward = true;
                break;
            case 'ArrowRight':
            case 'd':
                this.moveRight = true;
                break;
            case ' ':
                if (this.canJump) this.velocity.y += this.jumpHeight;
                this.canJump = false;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.moveForward = false;
                break;
            case 'ArrowLeft':
            case 'a':
                this.moveLeft = false;
                break;
            case 'ArrowDown':
            case 's':
                this.moveBackward = false;
                break;
            case 'ArrowRight':
            case 'd':
                this.moveRight = false;
                break;
        }
    }

    update(delta) {
        const speed = 400.0;
        const gravity = 9.8;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= gravity * 100.0 * delta;

        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize();

        if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * speed * delta;
        if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * speed * delta;

        this.controls.moveRight(-this.velocity.x * delta);
        this.controls.moveForward(-this.velocity.z * delta);

        this.camera.position.y += (this.velocity.y * delta);

        if (this.camera.position.y < 10) {
            this.velocity.y = 0;
            this.camera.position.y = 10;
            this.canJump = true;
        }
    }
}


