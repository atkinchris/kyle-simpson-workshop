# Kyle Simpson Workshop
Tuesday 28th June 2016 - PM Session

## Promise Abstractions

* `Promise.all([...])` resolves an array of promises, to an array of values in the same order.
* It resolves when all it's parameter promises are resolved, and rejects if any error.

```javascript
Promise.all([
  doTask1(),
  doTask2()
]).then(function(results) {
  results[0]; // => doTask1 results
  results[1]; // => doTask2 results
});
```

* `Promise.race([...])` resolves when any of it's promises resolve, and rejects if any error.

```javascript
Promise.race([
  trySomethingAsync(),
  new Promise(function(_, reject) {
    setTimeout(function() {
      reject('Timeout!');
    }, 3000);
  })
]).then(
  success,
  error
);
```


## Generators & Promises

```javascript
// Generators review
function* generator() {
  console.log('Hello');
  yield;
  console.log('World');
}

var it = generator();
it.next(); // => 'Hello'
it.next(); // => 'World'
```

* `yield;` is shorthand for `yield undefined;`.
* Generator `yield` is actually two way.

```javascript
function coroutine(g) {
  var it = g();
  return function() {
    return it.next.apply(it, arguments);
  }
}

var run = coroutine(function *() {
  var x = 1 + (yield);
  var y = 1 + (yield);
  yield (x + y);
});

run();
run(10);
console.log('Meaning of life: ' + run(30).value);
```

* `yield` can be used in generators to write asynchronous code - synchronously.

```javascript
function getData(d) {
  setTimeout(function() {
    run(d);
  }, 1000);
}

var run = coroutine(function *() {
  var x = 1 + (yield getData(10));
  var y = 1 + (yield getData(30));
  var answer = (yield getData(
    'Meaning of life: ' + (x + y)
  ));
  console.log(answer); // => 'Meaning of life: 42'
});

run();
```

* This reintroduces callbacks - and the trust issues that come with them.
* To avoid this: _yield promises_.
* **Kyle says:** This is super important. Yielding promises is the best of both worlds.

```javascript
function getData(d) {
  return ASQ(function(done) {
    setTimeout(function() {
      done(d);
    }, 1000);
  });
}

ASQ()
  .runner(function *() {
    var x = 1 + (yield getData(10));
    var y = 1 + (yield getData(30));
    var answer = yield (getData(
      'Meaning of life: ' + (x + y)
    ));
    yield answer;
  })
  .val(function(answer) {
    console.log(answer); // => 'Meaning of life: 42'
  });
```

* If the awaited promise rejects, a hard error will be thrown.

```javascript
function getData(d) {
  return ASQ(function(done) {
    setTimeout(function() { done.fail() }, 1000);
  });
}

ASQ()
  .runner(function *() {
    yield getData(10); // This throws an error as it rejects
  });
```


## Concurrency: Events & Promises

* Promises, by design, can only be resolved once. This makes them unsuitable for events like button clicks.


### RxJS

* Observation libraries can watch events and perform functions.
* Observable `.map`, much like `Array#map`, consumes an event stream at a point in time.
* [RxMarbles](rxmarbles.com) shows examples of _RxJS_ reactive operations.


### asynqence - Reactive Sequences

```javascript
function fromEvent(el, eventType) {
  return ASQ.react(function(proceed) {
    $(el).bind(eventType, proceed);
  });
}

// aka: observable
var reactive = fromEvent(button, 'click');

reactive
  .val(function (event) {
    return event.target.className;
  })
  .then(function(done, className) {
    // ...
  })
```

* Streams can be combined

```javascript
var reactive1 = fromEvent(button, 'click');
var reactive2 = fromEvent(input, 'keypress');

var reactive3 = ASQ.react.all(reactive1, reactive2); // a.k.a 'zip'
var reactive4 = ASQ.react.any(reactive1, reactive2); // a.k.a 'merge'
```


## CSP: Communicating Sequential Processes

* Create duplex channels for asynchronously passing data between generators.

```javascript
var ch = channel();

function *process1() {
  yield put(ch, 'Hello');
  var msg = yield take(ch);
  console.log(msg);
}

function *process2() {
  var greeting = yield take(ch);
  yield put(ch, greeting + ' World');
  console.log('Done');
}
```
