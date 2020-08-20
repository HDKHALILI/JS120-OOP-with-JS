Practice Problems: Hard Binding Functions with Contexts

1. What method can we use to bind a function permanently to a particular execution context?  
   Answer: `bind` method.

2. What will the following code log to the console?

```javascript
let obj = {
  message: "JavaScript",
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
```

Answer:  
It logs nothing. `bind` doesn't invoke the function instead returns a new function that is permanently bound to the context argument.

3. What will the following code output?

```javascript
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());
```

Answer:  
`console.log(foo())` logs `NaN`, this because the execution context for `foo` is the global object which has no properties called `a` and `b`. Accessing those properties return `undefined`. `undefined + undefined` is `NaN`.
`console.log(bar())` logs `5`. `bar` is explicitly bound to 'obj' that has properties `a` and `b`.

4. What will the code below log to the console?

```javascript
let positivity = {
  message: "JavaScript makes sense!",
};

let negativity = {
  message: "JavaScript makes no sense!",
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();
```

Answer:  
It logs `'JavaScript makes sense!'`. `bind` permanently bound the function to an context. No matter how you pass the function around, it will have that context.

5. What will the code below output?

```javascript
let obj = {
  a: "Amazebulous!",
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);
```

Answer:  
It logs `'Amazebulous!'`. Once you hard bind a function to a context, you cannot change that context. Calling it with `call` or `apply` makes no difference.
