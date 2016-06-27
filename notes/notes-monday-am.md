# Kyle Simpson Workshop
Monday 27th June 2016 - AM Session

## Introduction

* Always prioritise _code readability_, over verbosity and optimisation.
* You don't need to cache `Array.length` - in fact it can be slower than allowing the engine to optimise.
* Familiarity is by far the most important factor in judging code as readable.

## Arrow Functions
* They're anonymous - difficult to debug - but it mostly will get an inferred name.
* Arrow functions used as arguments remain anonymous.
* Until they're fully adopted, they cost readability with their non-consistent grammar.

```javascript
function foo(x) {
  return x * 2;
}

// Inferred name
const foo = x => x * 2;

// Will remain anonymous
bar(x => x * 2);
```

* Parentheses are required for non-simple parameters.

```javascript
// No parentheses around the parameter
x => x * 2;

// Parentheses around the parameter
(x) => x * 2;
() => x * 2;
(x, y) => x * y;

// Kyle hates
_ => x * 2;
// ...and worse
_=> x * 2;

// Returning objects - must be wrapped in parentheses
(x, y) => ({ x: x, y: y });
```

* Arrow functions have a serious benefit with lexical `this` resolution.

```javascript
// Bad - context binding
var context = this;
bar(function () {
  console.log(context.x);
});

// Better - using bind
bar(function () {
  console.log(this.x);
}.bind(this));

// Best - arrow function to bind lexical scope
bar(() => {
  console.log(this.x);
});
```

* For further reading, see _Arrow Functions_ chapter in _ES6 & Beyond_ book.
