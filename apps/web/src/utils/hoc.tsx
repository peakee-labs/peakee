import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useRouter } from 'next/router';

import { useAuth } from './hooks/useAuth';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
	const AuthenticatedScreen = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.push('/signIn');
			} else if (!loading && user) {
				console.log('init user');
			}
		}, [user, loading]);

		return loading || !user ? (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		) : (
			<WrappedComponent {...props} as never />
		);
	};

	return AuthenticatedScreen;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
