import * as THREE from "three";
import fontface from "./assets/fonts/Overpass Mono Light_Regular.json";

class Logo {
  public object: THREE.Object3D;

  constructor() {
    this.object = new THREE.Object3D();

    const loader = new THREE.FontLoader();
    const geometry = new THREE.TextBufferGeometry("{isogram}", {
      font: loader.parse(fontface),
      size: 80,
      height: 0,
      curveSegments: 4,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 8,
    });

    var material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      //wireframe: true,
      flatShading: false,
      emissive: 10000000,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.1, 0.1, 0.1);

    this.object.add(mesh);
  }
}

export { Logo };
