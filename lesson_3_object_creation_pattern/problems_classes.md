# Practice Problems - Classes

1. What do we mean when we say that classes are first-class values?

Answer:  
We can treat JavaScript classes like any other JavaScript value. They can be passed around to functions, returned from a function, assigned to variables, and used anywhere a value is expected.

2. Consider the following class declaration:

```javascript
class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}
```

What does the static modifier do? How would we call the method manufacturer?

Answer:  
The `static` modifier allows us to create a member that belongs to the class itself instead of the instance of class. You can call the method directly from the class, `Television.manufacturer()`

The `static` modifier, when used with a method, it marks that method as static. That is, the method is defined directly on the class, not on the object the class creates.
