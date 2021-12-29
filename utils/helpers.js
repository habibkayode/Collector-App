const dateAgo = (value) => {
	let today = new Date();
	let targetDate = new Date();
	targetDate.setDate(today.getDate() - value);
	return targetDate.toISOString();
};

const dateRangeQuery = (startDate, endDate) => {
	let sD = new Date(startDate).toISOString();
	let eD = new Date(endDate).toISOString();

	return `&between=${sD},${eD}`;
};

const pastDateQuery = (from) => {
	let hold = dateAgo(from);
	return `&between=${hold},${new Date().toISOString()}`;
};

export { dateAgo, dateRangeQuery, pastDateQuery };
