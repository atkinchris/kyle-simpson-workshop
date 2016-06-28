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
