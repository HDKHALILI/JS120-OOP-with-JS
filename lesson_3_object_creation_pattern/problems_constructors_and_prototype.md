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

4. What will the following code log to the console and why?

```javascript
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function () {
  return this.swung;
};

console.log(ninja.swingSword());
```

Answer:

```javascript
true;
```

All objects created with `Ninja` constructor shares the same prototype object and when we define `swingSword`, it immediately becomes available to the `ninja` object.

5. What will the following code output and why? Try to answer without running the code.

```javascript
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function () {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```

Answer:

```javascript
Uncaught TypeError: ninja.swingSword is not a function
```

We are reassigning the `Ninja`'s prototype instead of adding a property on it. The instance `ninja` still has the original prototype defined during `Ninja` invocation. If we create the instance after the reassignment it would not give error.

6. Implement the method described in the comments below:

```javascript
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung); // logs `true`
console.log(ninjaB.swing().swung); // logs `true`
```

Answer:

```javascript
Ninja.prototype.swing = function () {
  this.swung = true;
  // returning the context object
  return this;
};
```

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

```javascript
let ninjaA;

{
  const Ninja = function () {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else

ninjaA.constructor === ninjaB.constructor; // => true
```

Answer:

```javascript
let ninjaB = new ninjaA.constructor();
```

8. Since a constructor is just a function, you can call it without the `new` operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the `new` operator. The function should return the same result with either form. Use the code below to check your solution:

```javascript
function User(first, last) {
  // ...
}

let name = "Jane Doe";
let user1 = new User("John", "Doe");
let user2 = User("John", "Doe");

console.log(name); // => Jane Doe
console.log(user1.name); // => John Doe
console.log(user2.name); // => John Doe
```

Answer:

```javascript
function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + " " + last;
}
```

In the above code we are checking if `this` is created by the `User` constructor. Constructor functions built this way is called **scope-safe constructors**.
