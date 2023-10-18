import { injectFirestoreDB } from './db';

export const injectIOC = async () => {
	injectFirestoreDB();
};
