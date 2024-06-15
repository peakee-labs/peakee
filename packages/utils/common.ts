export const getUsername = (text: string) => {
	if (text.includes('@')) {
		return text.substring(0, text.indexOf('@'));
	}

	return text;
};

export const getFormattedTime = (date: Date) => {
	return date.getHours() + ':' + date.getMinutes() + ' ';
};
