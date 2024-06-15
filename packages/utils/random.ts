export function createRandomString(length = 10) {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return Array.from({ length }, () =>
		chars.charAt(Math.floor(Math.random() * chars.length)),
	).join('');
}
