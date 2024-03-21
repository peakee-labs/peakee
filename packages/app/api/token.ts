let defaultJWT: string;

export function getJWT() {
	return new Promise<string>((resolve) => {
		const check = () => {
			if (defaultJWT != '' && defaultJWT != undefined) {
				resolve(defaultJWT);
			} else {
				setTimeout(check, 100);
			}
		};
		check();
	});
}

export function setJWT(jwt: string) {
	defaultJWT = jwt;
}
