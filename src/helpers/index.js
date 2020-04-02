/**
 * Extract the intended array of objects required for the app.
 * @param {array} entries Raw entries from the spreadsheet API
 * @returns an array of objects that follows the expected format.
 */
export function extractData(entries) {
	return entries.map(extractObject);
}

function extractObject(entry) {
	const fieldNameList = Object.keys(entry).filter((fieldName) =>
		fieldName.includes("gsx$")
	);

	const formattedObjet = {};
	fieldNameList.forEach((fieldName) => {
		const trimmedName = fieldName.replace("gsx$", "");
		formattedObjet[trimmedName] = entry[fieldName][`$t`];
	});

	return formattedObjet;
}

export const time = function(date) {
	let time = new Date(date);
	let hours = time.getHours();
	hours = (hours + 24) % 24;
	let period = hours < 12 ? "AM" : "PM";
	hours = hours % 12 || hours;
	let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
	return hours + ":" + minutes + " " + period;
};

export const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export const timeSafe = function(date) {
	// let time = new Date(date);
	// let hours = time.getHours();
	// hours = (hours + 24) % 24;
	// let period = hours < 12 ? "AM" : "PM";
	// hours = hours % 12 || hours;
	// console.log(date);
	// let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
	// console.log(period + hours + minutes);

	let x = date
		.split("T")[1]
		.split(":")
		.map((r) => parseInt(r, 10));
	let y =
		(x[0] < 12 ? "AM" : "PM") +
		x[0] +
		((x[1] + "").length ? "0" + x[1] : "" + x[2]);
	// console.log(y);
	return y;
	// return period + hours + minutes;
};

export const getDay = function(str) {
	const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	let day = new Date(str);
	return days[day.getDay()];
};

export const pick = function(obj, keys) {
	return keys
		.map((k) => (k in obj ? {[k]: obj[k]} : {}))
		.reduce((res, o) => Object.assign(res, o), {});
};

export async function fetchJson(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		const isJsonError =
			error.message.includes("Unexpected token") &&
			error.message.includes("in JSON at position");

		if (isJsonError) {
			return null;
		}

		throw new Error("Response is not JSON", url);
	}
}

export function groupById(r, a) {
	r[a.id] = r[a.id] || [];
	r[a.id] = a;
	return r;
}

export function groupBy(objectArray, property) {
	return objectArray.reduce(function(acc, obj) {
		var key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
}

export function sortBy(list, rules) {
	const isArray = Array.isArray(list);
	if (isArray) {
		return list.sort(list, rules);
	}

	const entries = Object.entries(list);

	const rulesMap = entries.map((entry) => {
		const [label, group] = entry;
		const order = rules[label];
		return {label, group, order};
	});

	const sortedList = rulesMap.sort(function(a, b) {
		var orderA = a.order;
		var orderB = b.order;
		if (orderA < orderB) {
			return -1;
		}
		if (orderA > orderB) {
			return 1;
		}

		return 0;
	});

	const sortedObject = sortedList.reduce((acc, {label, group, order}) => {
		return (acc = {...acc, [label]: group});
	}, {});

	return sortedObject;
}

// getInt returns the integer value given a string
export function getInt(raw, defaultValue = 0) {
	if (raw === "" || isNaN(raw) || raw === null) {
		return defaultValue;
	}

	try {
		let v = parseInt(raw, 10);
		if (typeof v === "number") {
			return v;
		}

		return defaultValue;
	} catch (e) {
		return defaultValue;
	}
}

export function trimEmptyCountryData(series) {
	let i;
	for (i = 0; i < series.length; i++) {
		if (series[i] !== 0) {
			break;
		}
	}

	return series.slice(i + 1, series.length);
}

export function random_rgba() {
	let o = Math.round,
		r = Math.random,
		s = 255;
	return (
		"rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 1 + ")"
	);
}

export function hashCode(str) {
	let hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
}

export function pickColor(str) {
	return `hsl(${hashCode(str) % 360}, 100%, 80%)`;
}

export function trimEmptyCountriesData(data) {
	let countries = Object.keys(data);
	let output = {};

	for (let i = 0; i < countries.length; i++) {
		let country = countries[i];
		output[country] = trimEmptyCountryData(data[country]);
	}

	return output;
}
