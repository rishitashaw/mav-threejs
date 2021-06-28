import "./style.css";
import "./app.js";
import * as THREE from "three";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { TimelineMax } from "gsap";

import * as gui from "dat.gui";

import texture from "../static/textures/1.jpg";

export default class Sketch {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      3000
    );
    this.camera.position.set(0, 0, 200);

    this.scene = new THREE.Scene();
    this.isPlaying = true;

    this.time = 0;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.addMesh();

    this.render();

    //loader
    this.loader = new GLTFLoader();
    this.loader.load("man2/scene.gltf", (gltf) => {
      this.scene.add(gltf.scene);
      gltf.scene.position.y = -1000;
      gltf.scene.traverse((o) => {
        if (o.isMesh) {
          o.scale.set(6, 6, 6);

          o.material = this.material;
        }
      });
    });
  }

  addMesh() {
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        progress: { type: "f", value: 0 },
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        sky: {
          type: "f",
          value: new THREE.TextureLoader().load(texture),
        },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
    });

    let number = 512 * 512;

    this.geometry = new THREE.BufferGeometry();
    this.position = new THREE.BufferAttribute(new Float32Array(number * 3), 3);

    let index = 0;
    for (let i = 0; i < 512; i++) {
      let posX = i - 256;
      for (let j = 0; j < 512; j++) {
        this.position.setXYZ(index, posX * 2, (j - 256) * 2, 0);
        index++;
      }
    }

    this.geometry.setAttribute("position", this.position);

    this.mesh = new THREE.Points(this.geometry, this.material);
    // this.scene.add(this.mesh);
  }

  render() {
    this.time++;
    //this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch();
