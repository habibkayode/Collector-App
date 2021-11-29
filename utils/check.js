const checkPhone = (phone) => {
	const reg = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (reg.test(phone)) {
		return true;
	} else {
		return false;
	}
};

const checkEmail = (email) => {
	const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (reg.test(email)) {
		return true;
	} else {
		return false;
	}
};

function isObjEmpty(obj) {
	return Object.keys(obj).length === 0;
}

export { checkPhone, checkEmail, isObjEmpty };
