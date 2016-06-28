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
