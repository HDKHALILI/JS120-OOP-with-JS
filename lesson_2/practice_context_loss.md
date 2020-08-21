# Practice Problems: Dealing with Context Loss

1. The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.

```javascript
let turk = {
  firstName: "Christopher",
  lastName: "Turk",
  occupation: "Surgeon",
  getDescription() {
    return (
      this.firstName + " " + this.lastName + " is a " + this.occupation + "."
    );
  },
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
```

Answer:  
It logs: `'undefined undefined is a undefined.'`  
When we pass `turk.getDescription` to `logReturnVal` we are striping it from its context. When we execute it as `func`, `this` is now the global object instead of `turk` object. Since the global object doesn't have the properties that `func` is trying to access, we get the output we didn't expect.
