import * as THREE from "three";
import fontface from "./assets/fonts/Overpass Mono_Bold.json";
import logoPng from "./assets/isogram-logo-1-color-white.png";

class Logo {
  public object: THREE.Object3D;

  constructor() {
    this.object = new THREE.Object3D();

    const spriteMap = new THREE.TextureLoader().load(logoPng);
    const spriteMaterial = new THREE.MeshBasicMaterial({
      map: spriteMap,
      color: 0x333333,
      transparent: true,
    });

    const planeGeom = new THREE.PlaneBufferGeometry(23.94, 15.04);

    const plane = new THREE.Mesh(planeGeom, spriteMaterial);

    this.object.add(plane);
  }
}

export { Logo };
