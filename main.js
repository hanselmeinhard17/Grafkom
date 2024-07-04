import * as THREE from 'three';
import { Player, Player2, PlayerController, PlayerController2, ThirdPersonCamera } from './player.js';
import { Lamp, Pole, Pole2, Box, Bar, Bar2, Kaki, Kursi, Tiang, Lamp2, Lamp3, Piala, Microphone, Headphone, Carpet , SpotlightManager , SpotlightManager2, Stand, SpotlightManager3, carpetBulat,lampuAtas, SpotlightManager4, SpotlightManager5, Penonton1, Penonton2, Penonton3, Penonton4, Penonton5, Penonton6, Penonton7, Penonton8 } from './objek.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { FreeCameraPlayer } from '/FreeCameraPlayer.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

class Main {
    static init() {
        var canvasReference = document.getElementById("canvas");
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasReference
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.shadowMap.enabled = true;

        var cubeTextureLoader = new THREE.CubeTextureLoader();
        cubeTextureLoader.setPath('img/');

        var cubeMapTexture = cubeTextureLoader.load([
            '1.jpg',
            '1.jpg',
            '1.jpg',
            '1.jpg',
            '1.jpg',
            '1.jpg'
        ]);
        var material3 = new THREE.MeshStandardMaterial({
            color: 0xF5F5DC,
            // envMap: cubeMapTexture,
            // metalness: 1.0,
            // roughness: 0.0
        });

        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var cube = new THREE.Mesh(geometry, material3);
        cube.position.set(0, 20, -40);
        cube.rotation.set(0, Math.PI , 0);
        cube.material.side = THREE.BackSide;
        cube.receiveShadow = true;
        this.scene.add(cube);


        //Ambient Diffuse Specular 
        var material = new THREE.MeshPhongMaterial({
            color: 0x818181,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30       // Tingkat shininess
        });
        var plane = new THREE.Mesh(
            new THREE.BoxGeometry(40, 40, 4),
            material
        );
        this.scene.add(plane);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(0, -2, 0);
        plane.receiveShadow = true;

          var material2 = new THREE.MeshPhongMaterial({
            color: 0xFFF8DC,    // Warna dasar (Diffuse)
            specular: 0x111111, // Warna Specular (highlight)
            shininess: 30 ,     // Tingkat shininess
           
        });

        var plane2 = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 10),
            material2
        );
        this.scene.add(plane2);
        plane2.rotation.x = -Math.PI / 2;
        plane2.position.set(0, -20, -40);
        plane2.receiveShadow = true;

        var ambientLight = new THREE.AmbientLight(0x404040, 1); // Warna dan intensitas
        this.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0x00008B, 1);
        directionalLight.position.set(0, 50, 2);
        directionalLight.shadow.camera.left = -200;
        directionalLight.shadow.camera.right = 200;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -200;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 200;

        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Set posisi awal untuk player
        var playerStartPosition = new THREE.Vector3(0, 5, 20);
        var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera1.position.copy(playerStartPosition);
        camera1.lookAt(new THREE.Vector3(0, 0, 0));

        this.player = new Player(
            new ThirdPersonCamera(camera1, playerStartPosition, new THREE.Vector3(0, 0, 0)),
            new PlayerController(),
            this.scene,
            5 // kecepatan player
        );

        // Set posisi awal untuk player2
        var player2StartPosition = new THREE.Vector3(0, 5, 20); // Misalnya posisi di belakang player pertama
        var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera2.position.copy(player2StartPosition);
        camera2.lookAt(new THREE.Vector3(0, 0, 0));

        this.player2 = new Player2(
            new ThirdPersonCamera(camera2, player2StartPosition, new THREE.Vector3(0, 0, 0)),
            new PlayerController2(),
            this.scene,
            5 // kecepatan player
        );
        

        // Menentukan pemain yang aktif (player 1 atau player 2)
        this.activePlayer = this.player; // Mulai dengan player pertama
        this.useFreeCamera = false; // State untuk penggunaan FreeCameraPlayer

        //free camera
        this.freeCameraPlayer = new FreeCameraPlayer(this.scene);

        

        // Mendengarkan keypress untuk beralih antara pemain
        document.addEventListener('keypress', (event) => {

            if (event.key === 'p' || event.key === 'P') {
                // Toggle antara player1 dan player2
                this.activePlayer = this.activePlayer === this.player ? this.player2 : this.player;

                // Set kamera untuk mengikuti player yang aktif
                this.cameraFollowActivePlayer();
           
            } else if (event.key === '+' || event.key === '=') {
                // Zoom in
                this.zoomCamera(-1);
            } else if (event.key === '-' || event.key === '_') {
                // Zoom out
                this.zoomCamera(1);
            } else if (event.key === 'c' || event.key === 'C') {
                // Toggle ke FreeCameraPlayer
                this.useFreeCamera = !this.useFreeCamera;
                console.log("Switching to Free Camera:", this.useFreeCamera);
            }
        });

         document.addEventListener('click', () => {
            this.activePlayer.camera.controls.lock();
        });

        //penonton
        var penonton1Positions = [
            new THREE.Vector3(30, -15, -55)
        ];

        var penonton1Rotations = [
            new THREE.Vector3(0, Math.PI / -7, 0)
        ];
        let penonton1 = [];
        for (let i = 0; i <  penonton1Positions.length; i++) {
           penonton1.push(new Penonton1( penonton1Positions[i],penonton1Rotations[i], this.scene));
        };


        var penonton2Positions = [
            new THREE.Vector3(26, -15, -58),
            new THREE.Vector3(35, -15, -68)
        ];

        var penonton2Rotations = [
            new THREE.Vector3(0, Math.PI / -7, 0),
            new THREE.Vector3(0, Math.PI / -7, 0)
        ];
        let penonton2 = [];
        for (let i = 0; i <  penonton2Positions.length; i++) {
           penonton2.push(new Penonton2( penonton2Positions[i],penonton2Rotations[i], this.scene));
        };


        var penonton4Positions = [
            new THREE.Vector3(-25, -15, -65),
            new THREE.Vector3(-40, -15, -70),
            new THREE.Vector3(-50, -15, -55)
        ];

        var penonton4Rotations = [
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0)
        ];
        let penonton4 = [];
        for (let i = 0; i <  penonton4Positions.length; i++) {
           penonton4.push(new Penonton4( penonton4Positions[i],penonton4Rotations[i], this.scene));
        };


        var penonton5Positions = [
            new THREE.Vector3(-30, -15, -82),
            new THREE.Vector3(30, -15, -85),
            new THREE.Vector3(50, -15, -67)
        ];

        var penonton5Rotations = [
            new THREE.Vector3(0, Math.PI / -3, 0),
            new THREE.Vector3(0, Math.PI / -3, 0),
            new THREE.Vector3(0, Math.PI / -3, 0)
        ];
        let penonton5 = [];
        for (let i = 0; i <  penonton5Positions.length; i++) {
           penonton5.push(new Penonton5( penonton5Positions[i],penonton5Rotations[i], this.scene));
        };

        var penonton6Positions = [
            new THREE.Vector3(-32, -15, -78),
            new THREE.Vector3(28, -15, -81),
            new THREE.Vector3(48, -15, -63)
        ];

        var penonton6Rotations = [
            new THREE.Vector3(0, Math.PI, 0),
            new THREE.Vector3(0, Math.PI, 0),
            new THREE.Vector3(0, Math.PI, 0)
        ];
        let penonton6 = [];
        for (let i = 0; i <  penonton6Positions.length; i++) {
           penonton6.push(new Penonton6( penonton6Positions[i],penonton6Rotations[i], this.scene));
        };


        var penonton7Positions = [
            new THREE.Vector3(-35, -15, -83),
            new THREE.Vector3(25, -15, -86),
            new THREE.Vector3(45, -15, -68)
        ];

        var penonton7Rotations = [
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0)
        ];
        let penonton7 = [];
        for (let i = 0; i <  penonton7Positions.length; i++) {
           penonton7.push(new Penonton7( penonton7Positions[i],penonton7Rotations[i], this.scene));
        };


        var penonton8Positions = [
            new THREE.Vector3(-30, -15, -60),
            new THREE.Vector3(-38, -15, -50),
            new THREE.Vector3(-50, -15, -75)
        ];

        var penonton8Rotations = [
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0),
            new THREE.Vector3(0, Math.PI / 7, 0)
        ];
        let penonton8 = [];
        for (let i = 0; i <  penonton8Positions.length; i++) {
           penonton8.push(new Penonton8( penonton8Positions[i],penonton8Rotations[i], this.scene));
        };


        
        var boxKacaPositions = [
            new THREE.Vector3(0, -2.7, -85),
            
        ];

        let boxKaca = boxKacaPositions.map(position => new Box(position, this.scene));

          var standPositions = [
            new THREE.Vector3(0, -7, -85)
           
        ];

        var standRotations = [
            new THREE.Vector3(0, Math.PI, 0)
        ];
        let stand = [];
        for (let i = 0; i <  standPositions.length; i++) {
           stand.push(new Stand( standPositions[i],standRotations[i], this.scene));
        };

        var tiangPositions = [
            new THREE.Vector3(0, -15, -9)
           
        ];

        var tiangRotations = [
            new THREE.Vector3(0, Math.PI, 0)
        ];
        let tiang = [];
        for (let i = 0; i <  tiangPositions.length; i++) {
           tiang.push(new Tiang( tiangPositions[i],tiangRotations[i], this.scene));
        };

         var kursiPositions = [
            new THREE.Vector3(39.5, -2.2, -3.5),
            new THREE.Vector3(39.5, -2.2, 3),
            new THREE.Vector3(-39.5, -2.2, -3.5),
            new THREE.Vector3(-39.5, -2.2, 3)
            // Tambahkan posisi lampu lainnya di sini
        ];

        var kursiRotations = [
            new THREE.Vector3(0, Math.PI / -2, 0),
            new THREE.Vector3(0, Math.PI / -2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0)
        ];
        let kursi = [];
        for (let i = 0; i <  kursiPositions.length; i++) {
            kursi.push(new Kursi( kursiPositions[i], kursiRotations[i], this.scene));
        };

        var lampPositions = [
        //     new THREE.Vector3(15, 6, -15),
        //     new THREE.Vector3(-15, 6, 15),
        //     new THREE.Vector3(15, 6, 15),
        //     new THREE.Vector3(-15, 6, -15),

            new THREE.Vector3(0, 37.7, -47)
        //     // Tambahkan posisi lampu lainnya di sini
        ];

        var lampRotations = [
        //     new THREE.Vector3(0, Math.PI / -4, 0),
        //     new THREE.Vector3(0, Math.PI / 1.25, 0),
        //     new THREE.Vector3(0, Math.PI / -1.25, 0),
        //     new THREE.Vector3(0, Math.PI / 3.5, 0),

            new THREE.Vector3(Math.PI / -4, Math.PI, Math.PI)
        ];
        let lamps = [];
        for (let i = 0; i < lampPositions.length; i++) {
            lamps.push(new Lamp(lampPositions[i], lampRotations[i], this.scene));
        };
        this.spotlightManager = new SpotlightManager(this.scene);
        //  this.spotlightManager.addSpotlight([14.5,8, 14.5], [0, 0, 0]);
        //  this.spotlightManager.addSpotlight([-14.5,8, -14.5], [0, 0, 0]);
        //  this.spotlightManager.addSpotlight([14.5,8, -14.5], [0, 0, 0]);
        //  this.spotlightManager.addSpotlight([-14.5,8, 14.5], [0, 0, 0]);
        
         this.spotlightManager3 = new SpotlightManager3(this.scene);
         this.spotlightManager3.addSpotlight([0, 35, -47], [-0.4, -3.5, -84.6]);

         var lampPositions2 = [
            // new THREE.Vector3(45, 40, -44),
            // new THREE.Vector3(-45, 40, 25),
            // new THREE.Vector3(45, 40, 25),
            // new THREE.Vector3(-45, 40, -44),

            // new THREE.Vector3(15, 40, -44),
            // new THREE.Vector3(-15, 40, 25),
            // new THREE.Vector3(15, 40, 25),
            // new THREE.Vector3(-15, 40, -44),

            // new THREE.Vector3(60, 40, -5),
            // new THREE.Vector3(-60, 40, -5),

            // new THREE.Vector3(-15, 40, -48),
            // new THREE.Vector3(15, 40, -48),
            // new THREE.Vector3(-45, 40, -48),
            // new THREE.Vector3(45, 40, -48),

            new THREE.Vector3(62, -15, -44),
            new THREE.Vector3(-62, -15, 30),
            new THREE.Vector3(62, -15, 30),
            new THREE.Vector3(-62, -15, -44),

            new THREE.Vector3(62, 41.5, -46),
            new THREE.Vector3(-63, 41.5, 28),
            new THREE.Vector3(62, 41.5, 28),
            new THREE.Vector3(-62, 41.5, -46)
            
        ];
        var lampRotations2 = [
            // new THREE.Vector3(0, Math.PI / -6, 0),
            // new THREE.Vector3(0, Math.PI / -6, 0),
            // new THREE.Vector3(0, Math.PI / 6, 0),
            // new THREE.Vector3(0, Math.PI / 6, 0),

            // new THREE.Vector3(0, Math.PI / -2, 0),
            // new THREE.Vector3(0, Math.PI / 2, 0),

            // new THREE.Vector3(0, Math.PI / 4, 0),
            // new THREE.Vector3(0, Math.PI / 6, 0),
            // new THREE.Vector3(0, Math.PI / -4, 0),
            // new THREE.Vector3(0, Math.PI / -6, 0),

            // new THREE.Vector3(0, Math.PI / -6, 0),
            // new THREE.Vector3(0, Math.PI / -6, 0),
            // new THREE.Vector3(0, Math.PI / 6, 0),
            // new THREE.Vector3(0, Math.PI / 6, 0),

             new THREE.Vector3(Math.PI/2, Math.PI, 0),
            new THREE.Vector3(Math.PI/2, Math.PI, 0),
            new THREE.Vector3(Math.PI/2, Math.PI, 0),
            new THREE.Vector3(Math.PI/2, Math.PI, 0),

            new THREE.Vector3(0, Math.PI/-2, 0),
            new THREE.Vector3(0, Math.PI/2, 0),
            new THREE.Vector3(0, Math.PI, 0),
            new THREE.Vector3(0, Math.PI/10, 0)
            
        ];
        let lamps2 = [];
        for (let i = 0; i < lampPositions2.length; i++) {
            lamps2.push(new Lamp2(lampPositions2[i], lampRotations2[i], this.scene));
        };

        this.spotlightManager2 = new SpotlightManager2(this.scene);
        this.spotlightManager.addSpotlight([62, -13, -44], [59, 40, -44]);
        this.spotlightManager.addSpotlight([-62, -13, 30], [-59, 40, 25]);
        this.spotlightManager.addSpotlight([62, -13, 30], [59, 40, 25]);
        this.spotlightManager.addSpotlight([-62, -13, -44], [-59, 40, -44]);

        this.spotlightManager4 = new SpotlightManager4(this.scene);
        this.spotlightManager4.addSpotlight([0,50,0], [0, 120, 0]);

        this.spotlightManager5 = new SpotlightManager5(this.scene);
        this.spotlightManager5.addSpotlight([0,100,0], [0, 0, 0]);

        //  this.spotlightManager2.addSpotlight([-61, 40, -45], [-63, 41.5, 28]);
        //  this.spotlightManager2.addSpotlight([-62, 40, 27], [62, 41.5, 28]);
        //  this.spotlightManager2.addSpotlight([62, 40, 27], [-62, 40, 27]);
        //  this.spotlightManager2.addSpotlight([62, 40, 27], [62, 40, -46]);
        //  this.spotlightManager2.addSpotlight([62, 40, -46], [62, 40, 27]);
        //  this.spotlightManager2.addSpotlight([62, 40, -46], [-62, 41.5, -46]);
        //  this.spotlightManager2.addSpotlight([-62, 41.5, -46], [62, 40, -46]);
        
        var lampPositions3 = [
            new THREE.Vector3(59, 40, -44),
            new THREE.Vector3(-59, 40, 25),
            new THREE.Vector3(59, 40, 25),
            new THREE.Vector3(-59, 40, -44)
        ];

        var lampRotations3 = [
            new THREE.Vector3(0, Math.PI / -6, 0),
            new THREE.Vector3(0, Math.PI / 1.25, 0),
            new THREE.Vector3(0, Math.PI / -1.25, 0),
            new THREE.Vector3(0, Math.PI / 6, 0)
        ];
        let lamps3 = [];
        for (let i = 0; i < lampPositions2.length; i++) {
            lamps3.push(new Lamp3(lampPositions3[i], lampRotations3[i], this.scene));
        };
        
         this.spotlightManager2.addSpotlight([58, 38, -43], [0, 0, 0]);
         this.spotlightManager2.addSpotlight([-58, 38, 24], [0, 0, 0]);
         this.spotlightManager2.addSpotlight([58, 38, 24],[0, 0, 0]);
         this.spotlightManager2.addSpotlight([-58, 38, -43], [0,0, 0]);
  
        var pialaPositions = [
            new THREE.Vector3(-0.4, -3.5, -84.6)
            // Tambahkan posisi lampu lainnya di sini
        ];

        var pialaRotations = [
            new THREE.Vector3(0, 0, 0)
        ];
        let piala = [];
        for (let i = 0; i < pialaPositions.length; i++) {
            piala.push(new Piala(pialaPositions[i], pialaRotations[i], this.scene));
        };

         var micPositions = [
            new THREE.Vector3(35, -3.8, -3.5),
            new THREE.Vector3(35, -3.8, 3),
            new THREE.Vector3(-35, -3.8, -3.5),
            new THREE.Vector3(-35, -3.8, 3),
            // Tambahkan posisi lampu lainnya di sini
        ];

        var micRotations = [
            new THREE.Vector3(0, Math.PI / -2, 0),
            new THREE.Vector3(0, Math.PI / -2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0)
        ];
        let mic = [];
        for (let i = 0; i < micPositions.length; i++) {
            mic.push(new Microphone(micPositions[i], micRotations[i], this.scene));
        };

        var headphonePositions = [
            new THREE.Vector3(32, 0, -3.5),
            new THREE.Vector3(32, 0, 3),
            new THREE.Vector3(-32, 0, -3.5),
            new THREE.Vector3(-32, 0, 3)
            // Tambahkan posisi lampu lainnya di sini
        ];

        var headphoneRotations = [
            new THREE.Vector3(Math.PI / -2, Math.PI / -2, Math.PI / -2),
            new THREE.Vector3(0, Math.PI / -2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0)
        ];
        let headphone = [];
        for (let i = 0; i < headphonePositions.length; i++) {
            headphone.push(new Headphone(headphonePositions[i], headphoneRotations[i], this.scene));
        };

        var carpetPositions = [
            new THREE.Vector3(35, -4, 0),
            new THREE.Vector3(-35, -4, 0),
           
        ];

        var carpetRotations = [
            new THREE.Vector3(0, Math.PI, 0),
            new THREE.Vector3(0, Math.PI, 0),
            
        ];
        let carpet = [];
        for (let i = 0; i < carpetPositions.length; i++) {
            carpet.push(new Carpet(carpetPositions[i], carpetRotations[i], this.scene));
        };

         var carpet2Positions = [
            new THREE.Vector3(0, -7, -85)
        ];

        var carpet2Rotations = [
            new THREE.Vector3(0, Math.PI / 2, 0)
        ];

        let carpet2 = [];
        for (let i = 0; i < carpet2Positions.length; i++) {
            carpet2.push(new carpetBulat(carpet2Positions[i], carpet2Rotations[i], this.scene));
        };

        

        // // Tambahkan objek box
        // var box = new Box(new THREE.Vector3(5, 1, 0), this.scene);

        // // Tambahkan box ke daftar collisionObjects milik Player
        // this.player.setCollisionObjects([box.mesh]);
        // this.player2.setCollisionObjects([box.mesh]);

        // Tambahkan tiang-tiang di setiap sudut plane

        var lampuatasPositions = [
            new THREE.Vector3(0, 120,0)
          
        ];

        let lampuatas = lampuatasPositions.map(position => new lampuAtas(position, this.scene));
        
        var polePositions = [
            new THREE.Vector3(-15, 4, -15),
            new THREE.Vector3(15, 4, -15),
            new THREE.Vector3(-15, 4, 15),
            new THREE.Vector3(15, 4, 15)
        ];

        let poles = polePositions.map(position => new Pole(position, this.scene));

        var polePositions2 = [
            new THREE.Vector3(-18, 3, -18),
            new THREE.Vector3(18, 3, -18),
            new THREE.Vector3(-18, 3, 18),
            new THREE.Vector3(18, 3, 18)
        ];

        let poles2 = polePositions2.map(position => new Pole2(position, this.scene));

        var kakiPosisi = [
            new THREE.Vector3(30, -2.2, -6),
            new THREE.Vector3(35, -2.2, -6),
            new THREE.Vector3(30, -2.2, 6),
            new THREE.Vector3(35, -2.2, 6)
        ];

        let kaki = kakiPosisi.map(position => new Kaki(position, this.scene));

        var material3 = new THREE.MeshPhongMaterial({
        color: 0x818181,    // Warna dasar (Diffuse)
        specular: 0x111111, // Warna Specular (highlight)
        shininess: 30,      // Tingkat shininess
        opacity: 0.5,       // Tingkat transparansi (0.0 - 1.0)
            transparent: true   // Mengaktifkan transparansi
        });

        var meja = new THREE.Mesh(
        new THREE.BoxGeometry(8, 15, 0.2),
        material3
        );

        this.scene.add(meja);
        meja.rotation.x = -Math.PI / 2;
        meja.position.set(32.5, -0.3, 0);
        meja.receiveShadow = true;

        var kakiPosisi2 = [
            new THREE.Vector3(-30, -2.2, -6),
            new THREE.Vector3(-35, -2.2, -6),
            new THREE.Vector3(-30, -2.2, 6),
            new THREE.Vector3(-35, -2.2, 6)
        ];

        let kaki2 = kakiPosisi2.map(position => new Kaki(position, this.scene));

        var meja2 = new THREE.Mesh(
        new THREE.BoxGeometry(8, 15, 0.2),
        material3
        );

        this.scene.add(meja2);
        meja2.rotation.x = -Math.PI / 2;
        meja2.position.set(-32.5, -0.3, 0);
        meja2.receiveShadow = true;


        var barPositions = [
            new THREE.Vector3(15, 6, 0),
            new THREE.Vector3(15, 4, 0),
            new THREE.Vector3(15, 2, 0),
            new THREE.Vector3(-15, 6, 0),
            new THREE.Vector3(-15, 4, 0),
            new THREE.Vector3(-15, 2, 0),

            new THREE.Vector3(0, 6, 15),
            new THREE.Vector3(0, 4, 15),
            new THREE.Vector3(0, 2, 15),
            new THREE.Vector3(0, 6, -15),
            new THREE.Vector3(0, 4, -15),
            new THREE.Vector3(0, 2, -15),
        ];

        var barRotations = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0),

            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0),
            new THREE.Vector3(0, Math.PI / 2, 0)
        ];

        let bars = [];
        for (let i = 0; i < barPositions.length; i++) {
            bars.push(new Bar(barPositions[i], barRotations[i], this.scene));
        }

        var barPositions2 = [
            new THREE.Vector3(17, 6, -17),
            new THREE.Vector3(17, 4, -17),
            new THREE.Vector3(17, 2, -17),
            new THREE.Vector3(-17, 6, 17),
            new THREE.Vector3(-17, 4, 17),
            new THREE.Vector3(-17, 2, 17),

            new THREE.Vector3(17, 6, 17),
            new THREE.Vector3(17, 4, 17),
            new THREE.Vector3(17, 2, 17),
            new THREE.Vector3(-17, 6, -17),
            new THREE.Vector3(-17, 4, -17),
            new THREE.Vector3(-17, 2, -17),
        ];

        var barRotations2 = [
            new THREE.Vector3(0, Math.PI / -4, 0),
            new THREE.Vector3(0, Math.PI / -4, 0),
            new THREE.Vector3(0, Math.PI / -4, 0),
            new THREE.Vector3(0, Math.PI / -3.5, 0),
            new THREE.Vector3(0, Math.PI / -3.5, 0),
            new THREE.Vector3(0, Math.PI / -3.5, 0),

            new THREE.Vector3(0, Math.PI / 4, 0),
            new THREE.Vector3(0, Math.PI / 4, 0),
            new THREE.Vector3(0, Math.PI / 4, 0),
            new THREE.Vector3(0, Math.PI / 3.5, 0),
            new THREE.Vector3(0, Math.PI / 3.5, 0),
            new THREE.Vector3(0, Math.PI / 3.5, 0)
        ];

        let bars2 = [];
        for (let i = 0; i < barPositions2.length; i++) {
            bars2.push(new Bar2(barPositions2[i], barRotations2[i], this.scene));
        }

        // Gabungkan semua objek yang dapat ditabrak
        let collisionObjects = [...poles.map(p => p.getMesh()), ...bars.map(b => b.getMesh())];
        // this.player.setCollisionObjects(collisionObjects);
        this.player2.setCollisionObjects(collisionObjects);

        this.clock = new THREE.Clock(); // Pindahkan ini sebelum digunakan

        // Render loop
        this.renderer.setAnimationLoop(() => {
            this.update(); // Update logika permainan
            this.render(); // Render scene
            const dt = this.clock.getDelta();
            this.player.update(dt);
            this.player2.update(dt);
        });

        //free camera
        this.freeCameraPlayer = new FreeCameraPlayer(this.scene);
    }

     static update() {
        const dt = this.clock.getDelta();
        if (this.useFreeCamera) {
            this.freeCameraPlayer.update(dt); // Update FreeCameraPlayer jika sedang digunakan
        } else {
            this.activePlayer.update(dt); // Update pemain yang aktif jika tidak menggunakan FreeCameraPlayer
        }
        }

    static render() {
        if (this.useFreeCamera) {
            this.renderer.render(this.scene, this.freeCameraPlayer.camera); // Render dengan FreeCameraPlayer jika sedang digunakan
        } else {
            this.renderer.render(this.scene, this.activePlayer.camera.camera); // Render dengan kamera pemain yang aktif
        }
    }

    static onWindowResize() {
        const camera = this.useFreeCamera ? this.freeCameraPlayer.camera : this.activePlayer.camera;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    static animate() {
        requestAnimationFrame(Main.animate);

        const dt = clock.getDelta();

        if (this.useFreeCamera) {
            this.freeCameraPlayer.update(dt);
        } else {
            this.activePlayer.update(dt);
            this.activePlayer.camera.update();
        }

        this.renderer.render(this.scene, this.activePlayer.camera.camera);
    }

    static cameraFollowActivePlayer() {
        this.activePlayer.camera.setup(this.activePlayer.mesh.position, this.activePlayer.rotationVector);
    }

    // static cameraFollowActivePlayer() {
    //     this.render(); // Render ulang dengan kamera yang mengikuti pemain yang aktif
    // }
    // static animate() {
    //     requestAnimationFrame(Main.animate);
    //     const dt = this.clock.getDelta();
    //     this.player.update(dt);
    //     this.player2.update(dt);
    //     this.renderer.render(this.scene, this.activePlayer.camera.camera);
    // }

    static zoomCamera(direction) {
    const camera = this.activePlayer.camera.camera;

    const minFov = 30;
    const maxFov = 100;

    const zoomSpeed = 1.5;

    const targetFov = camera.fov + direction * zoomSpeed;

    camera.fov = THREE.MathUtils.clamp(targetFov, minFov, maxFov);

    camera.updateProjectionMatrix();

    this.renderer.render(this.scene, camera);
}

    static onPointerlockError(event) {
        console.error('PointerLockControls: Unable to use Pointer Lock API');
    }

    
}

window.addEventListener('DOMContentLoaded', () => {
    Main.init();
});

window.addEventListener('resize', () => {
    Main.onWindowResize();
});


