$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),

		// Channels as streams
		clicks = ASQ.csp.chan(),
		msgs = ASQ.csp.chan(),
		queuedClick;

	$btn.click(listenToClicks);

	// run go-routines
	ASQ().runner(
		ASQ.csp.go(sampleClicks),
		ASQ.csp.go(logClick)
	);

	// push click event messages into channel
	function listenToClicks(evt){
		if (!queuedClick) {
			// Cannot use 'yield' - so must return a promise
			queuedClick = ASQ.csp.putAsync(clicks,evt);
			queuedClick.then(function(){
				queuedClick = null;
			});
		}
	}

	// sample clicks channel
	function *sampleClicks() {
		// while (true) - keep the generator running forever
		while (true) {
			yield ASQ.csp.take(
				ASQ.csp.timeout(1000)
			);
			yield ASQ.csp.take(clicks);
			yield ASQ.csp.put(msgs,"clicked!");
		}
	}

	// subscribe to sampled message channel
	function *logClick() {
		while (true) {
			var msg = yield ASQ.csp.take(msgs);
			$list.append($("<div>" + msg + "</div>"));
		}
	}
});
