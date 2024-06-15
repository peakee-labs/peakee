import { useEffect, useState } from 'react';
import { initAuthPromise, initAuthResolved } from '@peakee/auth';
import type { UserProfile } from '@peakee/types';

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
