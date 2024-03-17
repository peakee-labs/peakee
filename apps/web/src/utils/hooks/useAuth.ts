import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

export function useAuth() {
	const user = useSelector((state: RootState) => state.user.profile);
	const loading = useSelector(
		(state: RootState) => state.user.profileLoading,
	);

	return { user, loading };
}
