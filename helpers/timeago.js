// Gist from https://gist.github.com/abyr/109f838adc618c4f2b74c1dd541d0733
const timeago = function(text) {
	let now = new Date(),
		yesterday,
		date = new Date(text),
		diff = (now.getTime() - date.getTime()) / 1000;

	yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);

	if (diff <= 60) {
		return "A few seconds ago";
	} else if ((diff /= 60) < 60) {
		return (diff | 0) + " m ago";
	} else if ((diff /= 60) < 24) {
		if (date.getDate() === yesterday.getDate()) {
			text = "yesterday";
		} else {
			return (diff | 0) + "h ago";
		}
	} else {
		text = date.toLocaleDateString();
	}

	text +=
		" at " +
		date
			.toLocaleTimeString()
			.split(":")
			.slice(0, 2)
			.join(":");

	return text;
};

export default timeago;
