export function chunk<M>(array: Array<M>, chunkSize: number) {
	const ans: Array<Array<M>> = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		ans[Math.floor(i / chunkSize)] = array.slice(i, i + chunkSize);
	}
	return ans;
}
