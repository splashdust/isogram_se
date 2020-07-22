import * as THREE from "three";
import starSprite from "./assets/star.png";

class Starfield {
  public object: THREE.Object3D;

  private readonly spriteMaterial: THREE.SpriteMaterial;
  private readonly spriteMap: THREE.Texture;
  private options = {
    starCount: 2000,
    width: 350,
    height: 100,
    depth: 200,
  };

  constructor() {
    this.spriteMap = new THREE.TextureLoader().load(starSprite);
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: this.spriteMap,
      color: 0xffffff,
    });

    this.object = new THREE.Object3D();

    this.generateStarfield();
  }

  public animate() {
    this.object.children.forEach((star) => {
      star.position.z += 0.5;

      if (star.position.z > this.options.depth / 2) {
        star.position.z = -1 * (this.options.depth / 2);
        star.position.x = (Math.random() - 0.5) * this.options.width;
        star.position.y = (Math.random() - 0.5) * this.options.height;
      }
    });
  }

  private generateStarfield() {
    for (let i = 0; i < this.options.starCount; i++) {
      const newStar = new THREE.Sprite(this.spriteMaterial);
      newStar.position.x = (Math.random() - 0.5) * this.options.width;
      newStar.position.y = (Math.random() - 0.5) * this.options.height;
      newStar.position.z = (Math.random() - 0.5) * this.options.depth;
      newStar.scale.set(0.5, 0.5, 0.5);
      this.object.add(newStar);
    }
  }
}

export { Starfield };
