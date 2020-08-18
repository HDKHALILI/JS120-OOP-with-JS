# Practice Problems: Object Prototypes

1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);
```

--> logs `2`  
Object `baz` inherits from object `qux` meaning it now has access to all the properties of `qux`. When we access `foo` on `baz` object, JavaScript first looks in the object's own properties, when it deosn't find, it looks in the prototype chain. In this case the property `foo` is on the `qux` object (prototype of `baz`), when we access it from `baz` and from `qux` the value is `1`. Therefore, `1 + 1` = `2`.

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);
```

--> logs `3`.  
This problem is smillar to the first problem. The only distinction is the `baz.foo = 2`, property assignment doesn't use the prototype chain, instead it creates a new property in the `baz` object named `foo`. Now `baz.foo` returns `2` and `qux.foo` returns `1`. And `2 + 1` = `3`.

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);
```

--> logs `4`  
This problem is smillar to problem 1. The distinction is `qux.foo = 2`. This time we are reassigning the `foo` property of the prototype. All changes to prototype are observed by the objects that have inherited it. This is because objects hold a reference to their prototype objects. Since `baz` doesn't have its own `foo` property, `baz.foo` returns `2`. `2 + 2` = `4`.
