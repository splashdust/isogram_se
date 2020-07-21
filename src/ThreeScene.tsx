import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { SpinningCube } from "./SpinningCube";

var animateId: number = -1;

const ThreeScene = () => {
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const [renderer] = useState(new THREE.WebGLRenderer());
  const [lineBox] = useState(new SpinningCube());
  const [isAnimating, setIsAnimating] = useState(true);
  const renderEl = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(lineBox.object);
    camera.position.z = 50;

    renderEl.current.appendChild(renderer.domElement);
  }, [camera, scene, lineBox, renderer]);

  useEffect(() => {
    const animate = () => {
      isAnimating && lineBox.animate();

      renderer.render(scene, camera);
      animateId = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(animateId);
    animate();
  }, [isAnimating, lineBox, renderer, scene, camera]);

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
