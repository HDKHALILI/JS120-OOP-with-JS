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

5. Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.

```javascript
const TESgames = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    let self = this.this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ": " + title);
    });
  },
};
```

6. The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

```javascript
const TESgames = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ": " + title);
    }, this);
  },
};
```

7. Use an arrow function to achieve the same result:

```javascript
const TESgames = {
  titles: ["Arena", "Daggerfall", "Morrowind", "Oblivion", "Skyrim"],
  seriesTitle: "The Elder Scrolls",
  listGames: function () {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ": " + title);
    });
  },
};
```

8. Consider the following code:

```javascript
let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment();
  },
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
```

What will the value of foo.a be after this code runs?  
Answer:  
The value of `foo.a` will be `0`. Sinc `increment` is executed as a function, context is the global object, `this.a` references a property of the global object rather than property of `foo`.

10. Use one of the methods we learned in this lesson to invoke `increment` with an explicit context such that `foo.a` gets incremented with each invocation of `incrementA`.

Answer:

```javascript
let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.call(foo);
  },
};
```
