# Practice Problems: Implicit and Explicit Function Execution Contexts

1. What will the following code output? Try to determine the results without running the code.

```javascript
function func() {
  return this;
}

let context = func();

console.log(context);
```

Answer:  
It logs the global object. In Node, that is `global` and in browser that is `window`.  
That is because `func` is invoked as function, the implicit context for `func` is the global object, so it returns the global object.

2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.

```javascript
let obj = {
  func: function () {
    return this;
  },
};

let context = obj.func();

console.log(context);
```

Answer:  
The code logs `{ func: [Function: func] }`.  
Unlike problem 1 `obj.func()` is a method invocation which sets the explicit execution context to be the object that is used to invoke it. In problem 1 it was a regular function invocation which set the implicit context to be the global object of the runtime environment.

3. What will the following code output?

```javascript
message = "Hello from the global scope!";

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();
let foo = {
  message: "Hello from the function scope!",
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();
```

Answer:  
`deliverMessage()` logs `'Hello from the global scope!'`  
`foo.deviverMessage()` logs `'Hello from the function scope!'`

`message` variable is created without a keyword which sets it as a property of the global object. `deliverMessage` is invoked as a function, and its implicit execution context is the global object, therefore the function logs the value of `message`.  
`foo.deliverMessage = deliverMessage` creates a property on the `foo` object and set it to reference the `deliverMessage` function. Now `foo` has a method called `deliverMessage`. Using the `foo` object to invoke the `deliverMessage` method logs the value of `foo.message` because the explicit execution context for the method is the `foo` object (the caller).

4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

Answer:  
The Function methods `call` and `apply` let us explicitly set the function execution context.
