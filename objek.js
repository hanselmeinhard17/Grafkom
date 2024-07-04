import * as THREE from "three";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export class Penonton1 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
         loader.setPath('/hansel/');
        loader.load('Casual_2.fbx', (fbx) => {
            fbx.scale.setScalar(0.045);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Penonton2 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Casual_Hoodie.fbx', (fbx) => {
            fbx.scale.setScalar(0.045);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton3 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Grandpa.fbx', (fbx) => {
            fbx.scale.setScalar(0.014);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton4 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Male_Casual.fbx', (fbx) => {
            fbx.scale.setScalar(0.018);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton5 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Punk Girl.fbx', (fbx) => {
            fbx.scale.setScalar(0.0075);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton6 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Punk.fbx', (fbx) => {
            fbx.scale.setScalar(0.045);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton7 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Punk2.fbx', (fbx) => {
            fbx.scale.setScalar(0.045);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Penonton8 {
    constructor(position, rotation,scene) {

        const loader = new FBXLoader();
        loader.setPath('/hansel/');
        loader.load('Suit.fbx', (fbx) => {
            fbx.scale.setScalar(0.045);
            fbx.position.copy(position);
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
                c.receiveShadow = true;
            });
            scene.add(fbx);
        });
    }
}

export class Tiang {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('tiang.fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}


export class Lamp {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('lampuSorot (1).fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Lamp2 {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('lampuSorot (3).fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Lamp3 {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('lampuSorot (5).fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Microphone {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('mic.fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Piala {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('piala.fbx', (fbx) => {
            fbx.scale.set(5, 5, 5); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}
export class Stand {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('stand.fbx', (fbx) => {
            fbx.scale.set(0.02, 0.02, 0.02); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Carpet {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('Carpet.fbx', (fbx) => {
            fbx.scale.set(0.075, 0.05, 0.05); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class carpetBulat {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('carpetBulat.fbx', (fbx) => {
            fbx.scale.set(0.075, 0.05, 0.05); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Headphone {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('Headphones.fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class lampuAtas {
    constructor(position,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('lampuatas.fbx', (fbx) => {
            fbx.scale.set(100, 100, 100); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Kursi {
    constructor(position, rotation,scene) {
        // Load model lampu menggunakan FBXLoader
        const loader = new FBXLoader();
         loader.setPath('/FBX/');
        loader.load('ExecutiveChair1.fbx', (fbx) => {
            fbx.scale.set(4, 4, 4); // Sesuaikan skala model
            fbx.position.copy(position); // Letakkan lampu di atas tiang
            fbx.rotation.set(rotation.x, rotation.y, rotation.z);
            fbx.traverse(c => {
                c.castShadow = true;
            });
            scene.add(fbx);
            
        });
    }
}

export class Kaki {
    constructor(position, scene) {
    
        this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xFDF5E6,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        scene.add(this.mesh);
        }
    
    getMesh() {
        return this.mesh;
    }
}


export class Pole2 {
    constructor(position, scene) {
    
        this.geometry = new THREE.CylinderGeometry(0.7, 0.7, 7);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xb22727,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        scene.add(this.mesh);
        }
    
    getMesh() {
        return this.mesh;
    }
}

export class Pole {
    constructor(position, scene) {
        this.geometry = new THREE.CylinderGeometry(1.5, 1.5, 5);
        this.material = new THREE.MeshPhongMaterial({
            color:0x0b517c,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
            
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        scene.add(this.mesh);
    
    }
    
    getMesh() {
        return this.mesh;
    }
}

export class Bar2 {
    constructor(position, rotation, scene) {
        this.geometry = new THREE.BoxGeometry(0.4, 0.4, 4);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        scene.add(this.mesh);
    }
    
    getMesh() {
        return this.mesh;
    }
}

export class Bar {
    constructor(position, rotation, scene) {
        this.geometry = new THREE.BoxGeometry(0.4, 0.4, 30);
        this.material = new THREE.MeshPhongMaterial({
            color:0xffffff,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        scene.add(this.mesh);
    }
    
    getMesh() {
        return this.mesh;
    }
}

//belum terpakai
export class Box {
    constructor(position, scene) {
        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshPhongMaterial({
        color: 0x818181,    // Warna dasar (Diffuse)
        specular: 0x111111, // Warna Specular (highlight)
        shininess: 30,      // Tingkat shininess
        opacity: 0.5,       // Tingkat transparansi (0.0 - 1.0)
            transparent: true   // Mengaktifkan transparansi
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
        this.mesh.name = "box"; // Untuk identifikasi tabrakan
        scene.add(this.mesh);
    }
}

//obj
export function loadObject(scene, path) {
    const loader = new OBJLoader();
    loader.setPath('/obj/');
    loader.load(
        '48.obj',
        (object) => {
            scene.add(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log('An error happened', error);
        }
    );
}

export class SpotlightManager {
    constructor(scene) {
        this.scene = scene;
        this.spotlights = [];
    }

    addSpotlight(position, targetPosition, color = 0x00008B, intensity = 500) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(...position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI;
        spotlight.penumbra = 0.1;
        spotlight.decay = 1;
        spotlight.distance = 100;
        spotlight.target.position.set(...targetPosition);
        this.scene.add(spotlight.target);
        this.scene.add(spotlight);
        this.spotlights.push(spotlight);
    }

    updateSpotlights(cameraPosition, maxDistance = 100) {
        this.spotlights.forEach(spotlight => {
            const distance = cameraPosition.distanceTo(spotlight.position);
            spotlight.visible = distance < maxDistance;
        });
    }

    updateSpotlightColor(index, color) {
        if (index >= 0 && index < this.spotlights.length) {
            this.spotlights[index].color.set(color);
        }
    }

    updateSpotlightIntensity(index, intensity) {
        if (index >= 0 && index < this.spotlights.length) {
            this.spotlights[index].intensity = intensity;
        }
    }
}

export class SpotlightManager2 {
    constructor(scene) {
        this.scene = scene;
        this.spotlights = [];
    }

    addSpotlight(position, targetPosition, color = 0xFFE4E1, intensity = 1000) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(...position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI/10;
        spotlight.penumbra = 0.1;
        spotlight.decay = 1;
        spotlight.distance = 100;
        spotlight.target.position.set(...targetPosition);
        this.scene.add(spotlight.target);
        this.scene.add(spotlight);
        this.spotlights.push(spotlight);
    }

    updateSpotlights(cameraPosition, maxDistance = 50) {
        this.spotlights.forEach(spotlight => {
            const distance = cameraPosition.distanceTo(spotlight.position);
            spotlight.visible = distance < maxDistance;
        });
    }
    }

    export class SpotlightManager3 {
    constructor(scene) {
        this.scene = scene;
        this.spotlights = [];
    }

    addSpotlight(position, targetPosition, color = 0xFFD700, intensity = 1000) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(...position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI /20;
        spotlight.penumbra = 0.1;
        spotlight.decay = 1;
        spotlight.distance = 100;
        spotlight.target.position.set(...targetPosition);
        this.scene.add(spotlight.target);
        this.scene.add(spotlight);
        this.spotlights.push(spotlight);
    }

    updateSpotlights(cameraPosition, maxDistance = 50) {
        this.spotlights.forEach(spotlight => {
            const distance = cameraPosition.distanceTo(spotlight.position);
            spotlight.visible = distance < maxDistance;
        });
    }
    }

    export class SpotlightManager4 {
    constructor(scene) {
        this.scene = scene;
        this.spotlights = [];
    }

    addSpotlight(position, targetPosition, color = 0xA52A2A, intensity = 1000) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(...position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI/11;
        spotlight.penumbra = 0.1;
        spotlight.decay = 1;
        spotlight.distance = 100;
        spotlight.target.position.set(...targetPosition);
        this.scene.add(spotlight.target);
        this.scene.add(spotlight);
        this.spotlights.push(spotlight);
    }

    updateSpotlights(cameraPosition, maxDistance = 50) {
        this.spotlights.forEach(spotlight => {
            const distance = cameraPosition.distanceTo(spotlight.position);
            spotlight.visible = distance < maxDistance;
        });
    }
    }

    export class SpotlightManager5 {
    constructor(scene) {
        this.scene = scene;
        this.spotlights = [];
    }

    addSpotlight(position, targetPosition, color = 0xA52A2A, intensity = 100) {
        const spotlight = new THREE.SpotLight(color, intensity);
        spotlight.position.set(...position);
        spotlight.castShadow = true;
        spotlight.angle = Math.PI;
        spotlight.penumbra = 0.1;
        spotlight.decay = 1;
        spotlight.distance = 200;
        spotlight.target.position.set(...targetPosition);
        this.scene.add(spotlight.target);
        this.scene.add(spotlight);
        this.spotlights.push(spotlight);
    }

    updateSpotlights(cameraPosition, maxDistance = 50) {
        this.spotlights.forEach(spotlight => {
            const distance = cameraPosition.distanceTo(spotlight.position);
            spotlight.visible = distance < maxDistance;
        });
    }
    }



// export class Background {
//     constructor(position, rotation, scene) {

//      var cubeTextureLoader = new THREE.CubeTextureLoader();
//         cubeTextureLoader.setPath('img/'); // Set path untuk prefix dari file cube map

//         var cubeMapTexture = cubeTextureLoader.load([
//             'bg2.jpg', // Gambar equirectangular
//             'bg2.jpg', // Gambar equirectangular
//             'bg2.jpg', // Gambar equirectangular
//             'bg2.jpg', // Gambar equirectangular
//             'bg2.jpg', // Gambar equirectangular
//             'bg2.jpg'  // Gambar equirectangular
//         ]);


//         var material = new THREE.MeshStandardMaterial({
//             color: 0xffffff, // Warna dasar objek
//             envMap: cubeMapTexture, // Cube map sebagai environment map
//             metalness: 1.0, // Intensitas efek metalness
//             roughness: 0.0 // Kasar atau halus permukaan objek
//         });

//         var geometry = new THREE.BoxGeometry(100, 100, 100); // Geometri kubus besar sebagai background
//         cube.rotation.set(0, Math.PI / 2, 0); // Atur rotasi kubus jika perlu
//         cube.material.side = THREE.BackSide; // Menentukan sisi belakang (inner side) yang terlihat
//         this.scene.add(cube); // Tambahkan objek ke dalam scene
//         this.scene.background = cubeMapTexture; // Mengatur cube map sebagai background scene

//     }
// }

 //      const loader = new OBJLoader();

    // // Path relatif atau absolut ke file OBJ
    // const objPath = '/obj/48.obj';

    // Memuat model OBJ
    // loader.load(
    //     objPath,
    //     (object) => {
    //          object.position.set(-300, 0, 150); // Atur posisi objek
    //          object.scale.set(0.9, 0.9, 1);
    //          object.rotation.set(0, 0, 0);
    //         // Callback saat objek berhasil dimuat
    //         this.scene.add(object);
    //     },
    //     (xhr) => {
    //         // Callback untuk memantau progres loading
    //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //     },
    //     (error) => {
    //         // Callback jika terjadi error saat loading
    //         console.error('Failed to load OBJ model:', error);
    //     }
    // );
