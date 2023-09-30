import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	appId: APP_ID,
	apiKey: API_KEY,
	projectId: PROJECT_ID,
	authDomain: AUTH_DOMAIN,
	storageBucket: STORAGE_BUCKET,
	measurementId: MEASUREMENT_ID,
	messagingSenderId: MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);
