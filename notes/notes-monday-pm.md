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

### Named Parameters

* Object destructuring can be used to extract named parameters.

```javascript
function foo({ a, b, c, d, e, f, g } = {}) {
  // ...
}

foo({
  c: 1,
  a: 2,
  g: 3
});
```

* **Kyle says:** Useful pattern - _destructuring and restructuring_.
* Useful for deep merging objects.

```javascript
const defaults = {
  studentName: 'John',
  age: 25,
  address: {
    address1: '123 Easy Street',
    city: 'Austin',
    state: 'TX'
  },
  interests: [
    'javascript'
  ]
};

var config = {
  age: 30,
  address: {
    address1: '456 Easy Street'
  }
};

{
  let {
    studentName = defaults.studentName,
    age = defaults.age,
    address: {
      address1 = defaults.address.address1,
      city = defaults.address.city,
      state = defaults.address.state
    } = {},
    interests: [
      interest1 = defaults.interests[0],
      ...otherInterests
    ] = []
  } = config;

  config = {
    studentName,
    age,
    address: {
      address1,
      city,
      state
    },
    interests: [
      interest1,
      ...otherInterests
    ]
  };
}
```


## Object Literals

* Concise properties allow you to omit the property name declaration.
* Concise naming can also work for functions.

```javascript
var a = 1;

var o {
  a,
  // Function name is unneeded b: function() {}
  b() {

  }
}
```

* Concise functions can cause issues where names collide.

```javascript
var o = {
  a,
  // Will work
  b() {
    this.b();
  },
  // Will fail
  c() {
    c()
  }
}
```

* Computed properties are now valid.

```javascript
var prop = 'c';

// Old
var o = {
  a
};
o[prop] = 42;

// New
var o = {
  a,
  [prop]: 42
}

// Also works for functions
var o = {
  a,
  [prop + 'fn']() {

  }
}
```

* This also works for _generators_. `{ *a() {} }`


## Getters and Setters

```javascript
var o = {
  get abc() {
    return this.__abc;
  },
  set abc(x) { // Parameter name is required
    this.__abc = x;
  }
}
```


## String Interpolation

* **Kyle says:** _Template literals_ are better named _Interpolated string literals_.

```javascript
var name = 'Kyle';
var title = 'Teacher';
var workshop = 'ES6';

// String interpolation
var msg = 'Hello ' + name + ', ' +
  'you are the ' + title + ' of the ' +
  workshop + ' workshop!';

// String continuation - escaping new lines in source code
var msg = 'Hello ' + name + ', \
  you are the ' + title + ' of the ' +
  workshop + ' workshop!';

// Template literal
var msg = `Hello ${name}, you are the ${title} of the ${workshop} workshop!`;
```

* Tags can be used to perform functions on each string component.

```javascript
function foo(strings, ...values) {
  var str = '';

  return str;
}

var msg = foo`Hello ${name}, you are the ${title} of the ${workshop} workshop!`;
```


## Symbols

* Not created with `new` - `function` creator.
* Can be used as a _meta_ property on an object. Creates a unique symbol, guaranteed to be free from collisions.

```javascript
var x = Symbol('arbitrary string');

var o {
  [x]: 42
}

o[x]; // => 42

o[Object.getOwnPropertySymbols(o)[0]]; // => 42
```

* It's uncommon to create your own symbols - but there are built in ones that are useful.
  * `Symbol.iterator`
  * `Symbol.hasInstance`
  * `Symbol.toPrimitive`


## Iterators

* Can use symbols to access native iterator on `Array`-like objects.

```javascript
var a = [1, 2, 3, 4, 5];

var it = a[Symbol.iterator]();

it.next(); // => { value: 1, done: false }
it.next(); // => { value: 2, done: false }
it.next(); // => { value: 3, done: false }
it.next(); // => { value: 4, done: false }
it.next(); // => { value: 5, done: false }
it.next(); // => { value: undefined, done: true }

// Can also be done with a for-loop
for (let ret; !(ret || ret.done);) {
  ret = it.next();
  console.log(ret.value);  
}
```

* For-loops on iterators are messy. Use for-of.

```javascript
var a = [1, 2, 3, 4, 5];

for (let val of a) {
  console.log(val);
}
```


## Map

```javascript
var m = new Map();
m.set('x', 42);

for (var x of m.entries()) {
  console.log(x);
}
```

## Generators

* Not guaranteed to run to completion.
* Can be _paused_ by using `yield` to return a value.
* Return an iterator when executed.

```javascript
function *foo() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}

var it = foo();

for (let val of it) {
  console.log(val);
}
```

* Can be used to create your own iterators.

```javascript
// With Symbols
var o = {
  [Symbol.iterator]() {
    var i = 0;

    return {
      next() {
        if (i < 10) return { value: i++, done: false };
        return { done: true };
      }
    }
  }
}

// With Generators
var o = {
  *[Symbol.iterator]() {
    var keys = Object.getOwnPropertyNames(this);
    for (let key of keys) {
      yield this[key];
    }
  },
  a: 2,
  b: 3,
  c: 4
}
```

* Iterables cannot be used with `map` and `reduce` - these are specific to real arrays.
* Can be converted to real arrays with `[...o]`, allowing for `[...o].map(..)`.


### Number Iterators

* It's possible to use generators to create number iterators.

```javascript
Number.prototype[Symbol.iterator] = function *range() {
  var start = 0;
  var end = Number(this);
  for (var i = start; i <= end; i++) {
    yield i;
  }
}

for (let num of 8) {
  console.log(num);
} // => 0, 1, 2, 3, 4, 5, 6, 7, 8

// Or even more succinctly
[...8] // => [0, 1, 2, 3, 4, 5, 6, 7, 8]
```
