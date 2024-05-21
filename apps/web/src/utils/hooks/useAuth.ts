import { useEffect, useState } from 'react';
import { initAuthPromise, initAuthResolved } from '@peakee/app';
import type { UserProfile } from 'firebase/auth';

export function useAuth() {
	const [loading, setLoading] = useState(initAuthResolved);
	const [user, setUser] = useState<UserProfile>();

	useEffect(() => {
		initAuthPromise.then((user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);

	return { user, loading };
}
