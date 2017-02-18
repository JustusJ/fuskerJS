class Worker {

	constructor(queue, doneCallback, errorCallback) {
		this.queue = queue;
		this.doneCallback = doneCallback;
		this.errorCallback = errorCallback;
	}

	work(item) {
		let image = new Image();
		image.onload = this.doneCallback.bind(this, this, item);
		image.onerror = this.errorCallback.bind(this, this, item);
		image.src = item.thumbUrl;
	}

}

class ImageQueue {

	constructor(urls, updateCallback) {
		this.urls = urls;
		this.urlsCount = this.urls.length;
		this.updateCallback = updateCallback;
		this.images = [];
		this.doneCount = 0;
		this.errorCount = 0;
		this.runningWorkerCount = 0;
		this.doneCallback = this.doneCallback.bind(this);
		this.errorCallback = this.errorCallback.bind(this);
	}

	run(workerCount) {
		this.update();
		this.running = true;
		for(var i=0; i < workerCount; i++) {
			let worker = new Worker(this, this.doneCallback, this.errorCallback);
			this.startWorker(worker);
		}
	}

	stop() {
		this.running = false;
	}

	shift() {
		return this.urls.shift();
	}

	doneCallback(worker, item) {
		this.images.splice(item.index, 0, item);
		this.doneCount += 1;

		this.callback(worker, item)
	}

	errorCallback(worker, item) {
		this.errorCount += 1;
		this.callback(worker, item)
	}

	callback(worker, item) {
		this.runningWorkerCount -= 1;
		this.startWorker(worker);
		this.update();
	}

	update() {
		this.updateCallback(
			{
				images: this.images,
				doneCount: this.doneCount,
				errorCount: this.errorCount,
				runningWorkerCount: this.runningWorkerCount,
				urlsCount: this.urlsCount
			}
		);
	}

	startWorker(worker) {
		if(!this.running) { return };
		let item = this.shift();
		if(item) {
			this.runningWorkerCount += 1;
			worker.work(item);	
		}
	}

}

export default ImageQueue;