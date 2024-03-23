let defaultJWT: string;

export function getJWT() {
	return defaultJWT;
}

export function setJWT(jwt: string) {
	defaultJWT = jwt;
}
