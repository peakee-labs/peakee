import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'next/router';

import { useAuth } from './hooks/useAuth';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
	const AuthenticatedScreen = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		console.log(user, loading);

		useEffect(() => {
			if (!loading && !user) {
				router.push('/signIn');
			}
		}, [user, loading]);

		return loading ? (
			<View>
				<Text>Loading...</Text>
			</View>
		) : (
			<WrappedComponent {...props} as never />
		);
	};

	return AuthenticatedScreen;
}
