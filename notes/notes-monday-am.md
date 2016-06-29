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

## Scoping
* Default to making things as hidden as possible - _The Principle of Least Exposure_.

### `let`

```javascript
// Stylistic scoping of variables
function foo(x, y) {
  if (x > y) {
    var tmp = x;
    x = y;
    y = tmp;
  }
}

// Declaring all variables at the top of scope
function foo() {
  var i;

  for (i = 0; ..) {
    // ...
  }
}

// Let - block scoped
function foo(x, y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }

  for (let i = 0; ..) {
    // ...
  }
}
```

* Some people have advocated `let` is the new `var` - but this is not always the best thing.
* Instead - use `var` for all variables you intend to be used _across_ scopes.

```javascript
// Wrapping in a try/catch to debug will affect scope
function foo(x, y) {
  try {
    let z = bar(x) * y;
  } catch (err) {
    // z doesn't exist here!
  }

  // z doesn't exist here either!
}

// In this case, this looks like double declaration - it's not
// Kyle says: this is more readable - the declarations are closer to where it's used
function foo(x, y) {
  if (x > 10) {
    var z = x;
  }
  else {
    var z = y;
  }
}

function foo(x, y) {
  if (x > y) {
    // Explicit block scoping.
    // Stylistic declaration at top of scope, on one line
    { let tmp = x;
      x = y;
      y = tmp;
    }
  }
}
```

* _TDZ_ - _temporal dead zone_. Time between opening of a block and the time you declare a variable. A variable cannot be used in this _zone_. (**Kyle says**: WTF is that name)
* Hoisting isn't real - it is a metaphor for the actual first pass of compilation.
* `let` will automatically close scope for each iteration of a for-loop, removing the need for internal binding.

```javascript
// let will scope the i to the for-loop, and close it for each iteration
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log('i:', i);
  }, i * 1000);
}
```

### `const`

* Immutable assignment, not value - not _constant_.
* In the presence of long-lived closures, `const` will not be garbage collected until the scope is destroyed.

```javascript
const x = [1, 2, 3];

// Not allowed
x = [4, 5, 6];

// Is allowed
x[0] = 4;
```

* **Kyle says:** rather than using `const` to signal unchanging assignment - simply keep scopes short and don't reassign it.
* **Kyle says:** He's never had a bug that came from reassigning a variable.
* For _proper_ immutability, use `Object.freeze` - beware, this is shallow.
* **Kyle says:** `const` doesn't really help - it's more a reassuring _night light_ to a monster that doesn't exist.

```javascript
// Proper value immutability
// Object#freeze is shallow
const x = Object.freeze([1, 2, 3]);
```


## `...` Operator - Gather/Spread

* Not used to hide implementation - but to allow us to focus on what we're actually doing, and letting the engine handle the _how_.

```javascript
// Without ...
function foo() {
  var args = [].slice.call(arguments);
  args.push(42);
  bar.apply(null, args);
}

// Used as gather
function foo(...args) {
  args.push(42);
  // Used as spread
  bar(...args);
}

// Used to gather all remaining arguments
function foo(x, ...args) {
  args.push(42);
  x(...args);
}

// Could also not even use Array#push
function foo(...args) {
  bar(...args, 42);
}
```

* `...` can also be used for Array manipulation.

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];

var [0].concat(a, b, 7);
// => [0, 1, 2, 3, 4, 5, 6, 7]

var a = [1, 2, 3];
var b = [4, 5, 6];
var c = [0, ...a, ...b, 7];
```


## Default Parameters

* ES6 brings default parameters - which make defaults much easier for readability.

```javascript
function foo(x) {
  x = x || 42;
}

// Long form
function foo(x) {
  x = x !== undefined ? x || 42;
}

// Default parameter
function foo(x = 42) {
  // ...
}
```

* Default parameter can be any valid JavaScript

```javascript
function foo(x = bar()) {
  // ...
}

// Parameters can be used in other parameters
function foo(x = 2, id = uniqId(x)) {
  // ...
}
```

* Parameter list becomes it's own scope when using default parameters.

```javascript
var x = 10;

// x cannot be reached from the parameter scope.
function foo(id = uniqId(x)) {
  // ...
}
```

* Be careful with implementations of parameter internal scope.

```javascript
function foo(x = 2) {
  var x;
  console.log(x);
}

foo();
// Expected => undefined
// Chrome & Babel => 2

function foo(x = function() { return x; }) {
  var x = 2;
  console.log(x);
}

foo();
// Expected => function
// Chrome & Babel => 2
```
