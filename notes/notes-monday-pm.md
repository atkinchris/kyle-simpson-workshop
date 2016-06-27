# Kyle Simpson Workshop
Monday 27th June 2016 - PM Session

## Destructuring

```javascript
function foo() {
  return [1, 2, 3, 4];
}

var tmp = foo();
var a = tmp[0];
var b = tmp[1];
var c = tmp[2];

function bar() {
  return { x: 1, y: 2, z: 3, w: 8 };
}

var tmp = bar();
var a = tmp.x;
var b = tmp.y;
var c = tmp.z;
```

```javascript
// Array destructuring
var [a, b, c] = foo();

// Object destructuring
var { x, y, z } = bar();
```

* **Kyle says:** Use indentation and whitespace for readability in destructuring.
* Makes it more readable, and easier to see complex assignments.

```javascript
var [
  a,
  b = 12, // Default value for b
  c
] = foo();

var {
  x,
  y: W = 30, // Rename the value extracted to W
  z
} = bar();
```

* When only providing a single letter, it's omitting the destination, which is being inferred from the source name.
* Array destructuring a value that isn't an array, will fail with an error.
* Wrapped parentheses are required for destructuring assignment.

```javascript
var x, y, z;

// Wrapping parentheses required
({
  x: x,
  y: W = 30,
  o.z
} = bar() || {});
```

* Can work for complex object destructuring too.
* Defaults can be provided to defend against errors.

```javascript
function foo() {
  return [
    1,
    2,
    { a: 3 },
    { b: [4] }
  ];
}

var [
  a = 10,
  b = 42,
  {
    a: A = 13
  } = {}, // Add a default object to handle undefined errors
  {
    b: [
      B // Equivalent to '0: B'
    ] = []
  } = {}
]
```

* Defaults can be written in different ways, sometimes with different results

```javascript
function foo() {
  return { a: {} };
}

// Preferred
var {
  a: {
    b = 2, // => 2
    c = 3 // => 3
  } = {}
} = foo();

// Alternative
var {
  a: {
    b, // => undefined
    c // => undefined
  } = { b: 2, c: 3 }
} = foo();
```

* Can be used to extract a property multiple times.

```javascript
function foo() {
  return {
    a: 1,
    b: [2, 3, 4],
    f: 5
  };
}

var {
  a,
  b: [
    c,
    d,
    e
  ],
  b: originalB, // extracting b separately.
  f
} = foo();
```
