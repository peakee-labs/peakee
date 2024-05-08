type GetJWTFunc = () => Promise<string | undefined> | string | undefined;
export let getJWT: GetJWTFunc = () => {
	throw Error("Missing 'getJWTFunc' in config");
};

export const injectGetJWTFunc = (_getJWTFunc: GetJWTFunc) => {
	getJWT = _getJWTFunc;
};
