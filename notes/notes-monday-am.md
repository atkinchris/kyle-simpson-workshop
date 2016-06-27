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
* Instead - use `var` for all variables you intend to be used across scopes.

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
* Hoisting is a metaphor for the actual first pass of compilation.
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
* He's never had a bug that came from reassigning a variable.
* For _proper_ immutability, use `Object.freeze` - beware, this is shallow.
* `const` doesn't really help - it's more a reassuring _night light_ to a monster that doesn't exist.

```javascript
// Proper value immutability
// Object#freeze is shallow
const x = Object.freeze([1, 2, 3]);
```
