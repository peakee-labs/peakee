import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { setProfile } from '@peakee/app/state';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../auth';

export function useAuth() {
	const [loading, setLoading] = useState<boolean>(true);
	const userProfile = useSelector((state: RootState) => state.user.profile);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					setProfile({
						uid: user.uid,
						name: user.displayName as string,
						fullName: user.displayName as string,
						email: user.email as string,
						imageUrl: user.photoURL as string,
					}),
				);
			}

			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return { user: userProfile, loading };
}
