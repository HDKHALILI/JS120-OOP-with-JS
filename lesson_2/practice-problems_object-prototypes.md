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

4. completed in separate file: assign-property.js

5. Consider the following two loops:

```javascript
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
```

```javascript
Object.keys(foo).forEach((property) => {
  console.log(`${property}: ${foo[property]}`);
});
```

If `foo` is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

Answer:

If the `foo` object has a prototype that contains enumerable properties the loops will produce different result. For example consider the following code:

```javascript
let bar = { a: 1, b: 2 };
let foo = Object.create(bar);
foo.a = 3;
foo.c = 4;
```

`foo` has a prototype (`bar`).  
The first (`for/in`) loop will log all properties that are object's own and those in the prototype chain. Therefore, It will log:

```
a: 3    // from foo
c: 4    // from foo
b: 2    // from bar
```

`Object.keys` returns an array of enumerable of object's own properties. Since `foo` only have `c` and `a` as its own properties, the second loop will log:

```
a: 3    // from foo
c: 4    // from foo
```

The two loops only logs the same thing when the prototype chain deosn't contain any enumerable properties.

6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

You can create an object without a prototype by using `Object.create` and pass `null` as argument.

```javascript
let bareObject = Object.create(null);
```

You can check if an object has a prototype by using `Object.getPrototypeOf` and pass in the object as argument.

```javascript
Object.getPrototypeOf(bareObject); // if null then no prototype
```
