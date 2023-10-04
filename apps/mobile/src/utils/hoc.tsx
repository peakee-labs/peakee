import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { useNavigation } from '@react-navigation/native';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
	const AuthenticatedScreen = (props: P) => {
		const userProfile = useSelector(
			(state: RootState) => state.user.profile,
		);
		const navigation = useNavigation();

		useEffect(() => {
			if (!userProfile) {
				navigation.navigate('SignIn' as never);
			}
		}, [userProfile]);

		return <WrappedComponent {...props} as never />;
	};

	return AuthenticatedScreen;
}
