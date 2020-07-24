import * as THREE from "three";

class Terrain {
  public object: THREE.Object3D;

  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private dimensions = {
    width: 200,
    height: 200,
    widthSegments: 25,
    heightSegments: 25,
    strength: 1.5,
  };

  constructor() {
    this.object = new THREE.Object3D();
    this.geometry = new THREE.PlaneBufferGeometry(
      this.dimensions.width,
      this.dimensions.height,
      this.dimensions.widthSegments,
      this.dimensions.heightSegments
    );
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      //metalness: 1,
      wireframe: false,
    });

    this.randomize();

    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.rotateX(THREE.MathUtils.degToRad(-90));
    this.mesh.position.z -= 50;

    this.object.add(this.mesh);
  }

  public animate() {
    //this.mesh.position.z += 0.1;
    const newPositions = Array.from(this.geometry.attributes.position.array);

    let x = 0,
      y = 0,
      z = 0,
      index = 0;

    let clippingPoint =
      -1 *
      (this.dimensions.height / 2 +
        this.dimensions.height / this.dimensions.heightSegments);

    for (let i = 0, l = newPositions.length / 3; i < l; i++) {
      x = index++;
      y = index++;
      z = index++;

      newPositions[y] -= 0.05;

      if (newPositions[y] < clippingPoint) {
        let xpos = newPositions[x];
        let ypos =
          newPositions[y] +
          this.dimensions.height +
          this.dimensions.height / this.dimensions.heightSegments;
        let zpos =
          Math.random() *
          Math.abs(newPositions[x] / 4) *
          this.dimensions.strength;

        // We're flipping x and z below, in order to keep the correct
        // order after adding to the beginning of the array.
        newPositions.splice(x, 1);
        newPositions.unshift(zpos);

        newPositions.splice(y, 1);
        newPositions.unshift(ypos);

        newPositions.splice(z, 1);
        newPositions.unshift(xpos * -1);
      }
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(newPositions, 3)
    );

    this.geometry.computeVertexNormals();
    this.geometry.computeBoundingBox();
  }

  public randomize() {
    const newPositions = Array.from(this.geometry.attributes.position.array);

    let x = 0,
      y = 0,
      z = 0,
      index = 0;

    for (let i = 0, l = newPositions.length / 3; i < l; i++) {
      x = index++;
      y = index++;
      z = index++;

      newPositions[z] =
        Math.random() *
        Math.abs(newPositions[x] / 4) *
        this.dimensions.strength;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(newPositions, 3)
    );
  }
}

export { Terrain };
