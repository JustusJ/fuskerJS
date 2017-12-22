function throttle(fn, context, ms) {

	let throttled;
	let runAgain = false;
	return function() {
		const args = arguments;
		if(throttled) {
			clearTimeout(throttled);
			runAgain = true;
		} else {
			fn.apply(this, args);
		}
		throttled = setTimeout(() => {
			if(runAgain) { fn.apply(this, args); }
			throttled = false;
			runAgain = false;
		}, ms)
	}
}

export {throttle};