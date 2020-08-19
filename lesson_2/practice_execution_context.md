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
