# Practice Problems - Constructors and Prototypes

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

```javascript
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
```

Answer:

```javascript
NaN;
NaN;
```

The `area` and `perimeter` methods are called using the `RECTANGLE` object and that sets the context for the methods to be this object. Since `RECTANGLE` doesn't have `width` and `height` property, accessing them evaluates to `undefined`. And mathematical operations with `undefined` produces `NaN`, the methods return `NaN`.

2. How would you fix the problem in the code from problem 1?
   Answer:

```javascript
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  // one way is to use call method of the function and provide context
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
```

3. Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

Answer:

```javascript
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return Math.PI * this.radius ** 2;
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty("area")); // => false
```
