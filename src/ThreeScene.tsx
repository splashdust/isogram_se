import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { SpinningCube } from "./SpinningCube";
import { Terrain } from "./Terrain";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let animateId: number = -1;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const lineBox = new SpinningCube();
const terrain = new Terrain();
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

    scene.add(lineBox.object);
    scene.add(terrain.object);

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 20, 0);
    scene.add(light);

    terrain.object.position.y += -10;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 5000;

    renderEl.current.appendChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (isAnimating) {
        lineBox.animate();
        terrain.animate();
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
