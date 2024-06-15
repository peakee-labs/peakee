export const yearSince = (from: Date): number => {
	return new Date(new Date().getTime() - from.getTime()).getFullYear() - 1970;
};
