export function queryFromOptions(options?: object) {
	if (options) {
		const query = Object.keys(options).reduce((acc, key, index) => {
			if (options[key as keyof object]) {
				if (index == 0) {
					return key + '=' + options[key as keyof object];
				}

				return acc + '&' + key + '=' + options[key as keyof object];
			} else return acc;
		}, '');

		return query;
	} else {
		return '';
	}
}
