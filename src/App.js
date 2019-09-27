import React from "react";
import * as THREE from "three";
import Stats from "./utils/stats.min";
import Orbitcontrols from "three-orbitcontrols";

import "./css/threeMap.css";

class ThreeEarth extends React.Component {
  componentDidMount() {
    const that = this;
    that.initThreeEngine();
  }

  initThreeEngine = () => {
    let stats;
    //Three 三要素
    let camera, scene, renderer;
    //可以将多个对象打包成一个组，便可统一操作（移动、旋转等等）
    let group;
    let container = document.getElementById("WebGL-output");
    let width = container.clientWidth;
    let height = container.clientHeight;

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      group = new THREE.Group();
      scene.add(group);

      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
      camera.position.x = -10;
      camera.position.y = 15;
      camera.position.z = 500;
      camera.lookAt(scene.position);

      //控制地球 将相机放入控制器
      let orbitcontrols = new Orbitcontrols(camera);
      orbitcontrols.autoRotate = false;

      //光源
      let ambi = new THREE.AmbientLight(0x686868);
      scene.add(ambi);

      let spotLight = new THREE.DirectionalLight(0xffffff);
      spotLight.position.set(550, 100, 550);
      spotLight.intensity = 0.6;
      scene.add(spotLight);

      //纹理
      let loader = new THREE.TextureLoader();
      let planetTexture = require("./images/Earth.png");

      loader.load(planetTexture, texture => {
        let geometry = new THREE.SphereGeometry(200, 20, 20);
        let material = new THREE.MeshBasicMaterial({
          map: texture,
          overdraw: 0.5
        });
        let mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      });

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xffffff);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      stats = new Stats();
      container.appendChild(stats.dom);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }
    function render() {
      group.rotation.y -= 0.005; //这行可以控制地球自转
      renderer.render(scene, camera);
    }
  };

  render() {
    return <div id="WebGL-output"></div>;
  }
}

export default ThreeEarth;
