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

2. Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.

Answer:

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

function logReturnVal(func, context) {
  // we can use apply too
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
```

3. Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?

Answer:

```javascript
function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

let turkDescription = turk.getDescription.bind(turk);
logReturnVal(turkDescription);
```

4. Consider the following code:

```javascript
const TESgames = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ": " + title);
    });
  },
};

TESgames.listGames();
```

Will this code produce the following output? Why or why not?

```
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
```

Answer:  
No, it will not produce the above output. Instead we get this:

```
undefined: Arena
undefined: Daggerfall
undefined: Morrowind
undefined: Oblivion
undefined: Skyrim
```

Since functions lose their surrounding context when used as arguments to another function, the context of the function passed to `forEach` is not the TESgames object. Instead, it is the global object. Thus, this.seriesTitle resolves to undefined rather than "The Elder Scrolls".
