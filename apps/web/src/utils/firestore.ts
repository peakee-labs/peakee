import { collection, getFirestore } from 'firebase/firestore';

import { app } from './auth';

const db = getFirestore(app);
export const chatRoomsCollection = collection(db, 'ChatRooms');
export const usersCollection = collection(db, 'Users');
