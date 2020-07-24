import * as THREE from "three";
import starSprite from "./assets/star.png";

class Starfield {
  public object: THREE.Object3D;

  private readonly spriteMaterial: THREE.SpriteMaterial;
  private readonly spriteMap: THREE.Texture;
  private options = {
    starCount: 500,
    width: 100,
    height: 100,
    depth: 100,
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
      star.position.z += 0.05;
      star.position.y += 0.1;

      if (
        star.position.z > this.options.depth / 2 ||
        star.position.y > this.options.height / 2
      ) {
        star.position.z = (Math.random() - 0.5) * this.options.depth;
        star.position.x = (Math.random() - 0.5) * this.options.width;
        star.position.y = -1 * (this.options.height / 2);
      }
    });
  }

  private generateStarfield() {
    for (let i = 0; i < this.options.starCount; i++) {
      const newStar = new THREE.Sprite(this.spriteMaterial);
      newStar.position.x = (Math.random() - 0.5) * this.options.width;
      newStar.position.y = (Math.random() - 0.5) * this.options.height;
      newStar.position.z = (Math.random() - 0.5) * this.options.depth;
      newStar.scale.set(0.3, 0.3, 0.3);
      this.object.add(newStar);
    }
  }
}

export { Starfield };
