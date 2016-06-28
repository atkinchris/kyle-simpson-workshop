# Kyle Simpson Workshop
Tuesday 28th June 2016 - AM Session

## Parallel vs Async

* Concurrency is when two or more things are happening in the same period of time.
* Parallel is when two or more things are happening at the same time.
* Smaller, more composed _pieces_ of code allow for more concurrency.


## Callbacks

* Callbacks are continuations.
* Nested callbacks can be confusing and difficult to co-ordinate.
* Callbacks invert control - they hand control to another part of the code.
* You can't trust that the callback will be called as many times as you expect - or at all.
* **Kyle says:** A system you cannot trust, is a system you cannot trust.


## Thunks

* A Function that can be called with no arguments, and returns that same answer each time.

```javascript
function add(a, b) {
  return a + b;
}

function thunk() {
  return add(10, 20);
}

thunk(); // => 30
thunk(); // => 30
```

* Thunks can be structured for Async callbacks

```javascript
function asyncAdd(a, b, callback) {
  setTimeout(function() {
    callback(a + b);
  }, 1000);
}

function asyncThunk(callback) {
  asyncAdd(10, 20, callback);
}

asyncThunk(function(sum) {
  console.log(sum);
});
```

* These thunks are _lazy_. The function call is deferred until it's actually called.
