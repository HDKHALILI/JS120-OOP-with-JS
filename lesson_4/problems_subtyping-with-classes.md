# Practice Problems: Subtyping with Classes

1. Suppose we have the following classes:

```javascript
class Game {
  play() {
    return "Start the game!";
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}
```

What would happen if we added a `play` method to the `Bingo` class, keeping in mind that there is already a method of this name in the `Game` class from which the `Bingo` class inherits? Explain your answer. What do we call it when we define a method like this?

Answer:  
By defining a `play` method on `Bingo` will override the `play` method of the `Game` class, now JavaScript uses the `play` method on the `Bingo` instead of looking for it in the `Game` class. This is called "method-overriding".

2. Let's practice creating a class hierarchy.

Create a class named `Greeting` that has a single method named `greet`. The method should take a string argument, and it should print that argument to the console.

```javascript
class Greeting {
  greet(message) {
    console.log(message);
  }
}
```

Now, create two more classes that inherit from `Greeting`: one named `Hello`, and the other `Goodbye`. The `Hello` class should have a `hi` method that takes no arguments and logs "Hello". The `Goodbye` class should have a `bye` method that logs "Goodbye". Use the `greet` method from the `Greeting` class when implementing `Hello` and `Goodbye`; don't call `console.log` from either `Hello` or `Goodbye`.

```javascript
class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

let hi = new Hello();
hi.hi(); // "Hello"

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}

let bye = new Goodbye();
bye.bye(); // "Goodbye"
```
