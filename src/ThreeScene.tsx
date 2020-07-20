import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

const ThreeScene = () => {
  const [scene, setScene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const [renderer, setRenderer] = useState(new THREE.WebGLRenderer());
  const [material, useMaterial] = useState(
    new LineMaterial({
      color: 0xffffff,
      linewidth: 0.005,
      vertexColors: false,
    })
  );
  const [lineBox, setLineBox] = useState(new THREE.Object3D());
  const renderEl = useRef<HTMLDivElement>(document.createElement("div"));

  const animate = () => {
    requestAnimationFrame(animate);

    lineBox.rotation.x += 0.01;
    lineBox.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  useEffect(() => {
    getBoxLines(1, 1, 1).forEach((line) =>
      lineBox.add(new Line2(line, material))
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(lineBox);
    camera.position.z = 5;

    renderEl.current.appendChild(renderer.domElement);
    animate();
  });

  return (
    <div>
      <div ref={renderEl}></div>
    </div>
  );
};

function getBoxLines(width: number, height: number, depth: number) {
  width = width * 0.5;
  height = height * 0.5;
  depth = depth * 0.5;

  const lines = [];

  lines.push(
    new LineGeometry().setPositions([
      -width,
      -height,
      -depth,
      -width,
      height,
      -depth,
    ]),
    new LineGeometry().setPositions([
      -width,
      height,
      -depth,
      width,
      height,
      -depth,
    ]),
    new LineGeometry().setPositions([
      width,
      height,
      -depth,
      width,
      -height,
      -depth,
    ]),
    new LineGeometry().setPositions([
      width,
      -height,
      -depth,
      -width,
      -height,
      -depth,
    ]),
    new LineGeometry().setPositions([
      -width,
      -height,
      depth,
      -width,
      height,
      depth,
    ]),
    new LineGeometry().setPositions([
      -width,
      height,
      depth,
      width,
      height,
      depth,
    ]),
    new LineGeometry().setPositions([
      width,
      height,
      depth,
      width,
      -height,
      depth,
    ]),
    new LineGeometry().setPositions([
      width,
      -height,
      depth,
      -width,
      -height,
      depth,
    ]),
    new LineGeometry().setPositions([
      -width,
      -height,
      -depth,
      -width,
      -height,
      depth,
    ]),
    new LineGeometry().setPositions([
      -width,
      height,
      -depth,
      -width,
      height,
      depth,
    ]),
    new LineGeometry().setPositions([
      width,
      height,
      -depth,
      width,
      height,
      depth,
    ]),
    new LineGeometry().setPositions([
      width,
      -height,
      -depth,
      width,
      -height,
      depth,
    ])
  );

  return lines;
}

export default ThreeScene;
