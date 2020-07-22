import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import * as THREE from "three";

class SpinningCube {
  public object: THREE.Object3D;

  private material: LineMaterial;

  constructor(size: number = 45) {
    this.material = new LineMaterial({
      color: 0xffffff,
      linewidth: 0.005,
      vertexColors: false,
    });

    this.object = new THREE.Object3D();

    var geometry = new THREE.BoxBufferGeometry(size, size, size);
    var material = new THREE.MeshStandardMaterial({
      color: 0x010101,
      //wireframe: true,
      flatShading: true,
    });
    var cube = new THREE.Mesh(geometry, material);
    this.object.add(cube);

    //SpinningCube.getBoxLines(15, 15, 15).forEach((line) =>
    //  this.object.add(new Line2(line, this.material))
    //);
  }

  public animate(speed: number = 0.01): void {
    this.object.rotation.x += speed;
    this.object.rotation.y += speed * 2;
    this.object.rotation.z += speed / 2;
  }

  private static getBoxLines(
    width: number,
    height: number,
    depth: number
  ): Array<LineGeometry> {
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
}

export { SpinningCube };
