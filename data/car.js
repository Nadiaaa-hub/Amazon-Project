export class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    this.speed = carDetails.speed || 0;
  }

  displayInfo() {
    let trunkStatus;
    if (this.isTrunkOpen) {
      trunkStatus = "open";
    } else {
      trunkStatus = "closed";
    }
    console.log(
      `${this.brand}, ${this.model}, ${this.speed} km/h, Trunk: ${trunkStatus}`
    );
  }
  go() {
    if (this.isTrunkOpen === false) {
      this.speed += 5;
    }
    if (this.speed > 200) {
      this.speed = 200;
    }
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
    console.log(this.speed);
  }

  openTrunk() {
    if (this.speed > 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});
const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});

// console.log(car1);
// console.log(car2);

car1.go();
car1.go();
car1.go();
car1.brake();
car1.openTrunk();
car1.displayInfo();

car2.go();
car2.go();
car2.openTrunk();
car2.displayInfo();
