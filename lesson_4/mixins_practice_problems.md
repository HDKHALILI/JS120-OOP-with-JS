# Practice Problems

1. If we have a `Car` class and a `Truck` class, how can you use the `Speed` object as a mix-in to make them `goFast`? How can you check whether your `Car` or `Truck` can now go fast?

Answer:

```javascript
const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  },
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Truck.prototype, Speed);

// We can test it by instanciating the class and call the method
let car = new Car();
car.goFast(); // I'm a Car and going super fast!

let truck = new Truck();
truck.goFast(); // I'm a Truck and going super fast!

// We can use `in` operator to check if these objects have access to the method
console.log("goFast" in car); // true
console.log("goFast" in truck); // true
```

2. In the last question, we used a mix-in named Speed that contained a goFast method. We included the mix-in in the Car class and then called the goFast method from an instance of the Car class. You may have noticed that the string printed when we call goFast includes the name of the type of vehicle we are using. How is that done?

Answer:  
Every object's prototype has a `constructor` property that points to the constructor function that created the obect. Every constructor has a name property that contains the constructor's name. We use `this.constructor.name` to get the name. Inside the `goFast` `this` refers to the object that is calling it, then that object's constructor property will be used to get its constructor then the name of the constructor.

3. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named `Auto` and `Motorcycle` to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named `WheeledVehicle`. Their code, thus far, looks like this:

```javascript
class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30, 30, 32, 32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20, 20], 80, 8.0);
  }
}
```

Their boss now wants them to incorporate a new type of vehicle: a `Catamaran`.

```javascript
class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}
```

Answer:

```javascript
const MoveAble = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  },
};

// omitted code
Object.assign(WheeledVehicle.prototype, MoveAble);

// omitted code
Object.assign(Catamaran.prototype, MoveAble);
```
