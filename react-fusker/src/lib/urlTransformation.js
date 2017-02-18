const RESIZE_BASE_URL = "https://roflzomfg.de/resize.php?"

function toResizeUrl(url, width) {
	return RESIZE_BASE_URL + "url=" + encodeURIComponent(url) + "&width=" + encodeURIComponent(width);
}

export {toResizeUrl};
