import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { SpinningCube } from "./SpinningCube";
import { Terrain } from "./Terrain";
import { Starfield } from "./Starfield";
import { Logo } from "./Logo";

let animateId: number = -1;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const frontCube = new SpinningCube(20);
const megaCube = new SpinningCube(200);
const terrain = new Terrain();
const starfield = new Starfield();
const logo = new Logo();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const ThreeScene = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const renderEl = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;

    scene.fog = new THREE.Fog(0x000000, 80, 200);
    scene.add(frontCube.object);
    scene.add(terrain.object);
    scene.add(starfield.object);
    scene.add(megaCube.object);
    scene.add(logo.object);

    frontCube.object.position.y += 25;
    frontCube.object.position.z -= 20;
    frontCube.object.rotateX(-0.6);
    frontCube.object.rotateY(-0.45);
    frontCube.object.rotateZ(-0.5);

    logo.object.position.x -= 28;
    logo.object.position.y -= 5;

    megaCube.object.position.y += 100;
    megaCube.object.position.z -= 240;

    starfield.object.position.y += 35;
    starfield.object.position.z -= 35;

    const light = new THREE.PointLight(0xffffff, 0.1);
    light.position.set(0, 200, 20);
    scene.add(light);

    const light2 = new THREE.PointLight(0x0055ff, 20);
    light2.position.set(200, -150, 20);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x0055ff, 20);
    light3.position.set(-200, -150, 200);
    scene.add(light3);

    terrain.object.position.y += -15;

    //const controls = new OrbitControls(camera, renderer.domElement);
    //controls.maxPolarAngle = Math.PI * 0.5;
    //controls.minDistance = 10;
    //controls.maxDistance = 5000;

    window.addEventListener("mousemove", (e) => {
      const deltaX = e.clientX - window.innerWidth / 2;
      const deltaY = e.clientY - window.innerHeight / 2;
      camera.position.x = deltaX * 0.01;
      camera.position.y = deltaY * -0.01;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    });

    renderEl.current.appendChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (isAnimating) {
        //frontCube.animate(0.01);
        terrain.animate();
        starfield.animate();
        megaCube.animate(0.0025);
      }

      renderer.render(scene, camera);
      animateId = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(animateId);
    animate();
  }, [isAnimating]);

  return (
    <div>
      <div ref={renderEl}></div>
      <button
        onClick={() => setIsAnimating(!isAnimating)}
        style={{
          position: "absolute",
          zIndex: 999,
          top: "1rem",
          right: "1rem",
        }}
      >
        Toggle cube anim
      </button>
    </div>
  );
};

export default ThreeScene;
