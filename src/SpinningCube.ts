import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import * as THREE from "three";

class SpinningCube {
  public object: THREE.Object3D;

  private material: LineMaterial;

  constructor() {
    this.material = new LineMaterial({
      color: 0xffffff,
      linewidth: 0.005,
      vertexColors: false,
    });

    this.object = new THREE.Object3D();

    SpinningCube.getBoxLines(10, 10, 10).forEach((line) =>
      this.object.add(new Line2(line, this.material))
    );
  }

  public animate(): void {
    this.object.rotation.x += 0.01;
    this.object.rotation.y += 0.02;
    this.object.rotation.z += 0.005;
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
