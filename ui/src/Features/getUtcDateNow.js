const getUtcDateNow = () => {
	const dateNowGmt = new Date();
	const dateNowUtc = new Date(
        dateNowGmt.getTime() - dateNowGmt.getTimezoneOffset() * 60000
      ).toISOString();
	
	return dateNowUtc;
} 

export {getUtcDateNow};