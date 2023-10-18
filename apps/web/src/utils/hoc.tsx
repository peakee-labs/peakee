import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { initUserChatData } from '@peakee/app/utils';
import { useRouter } from 'next/router';

import { useAuth } from './hooks/useAuth';
import { listenUserChatData } from './firestore';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
	const AuthenticatedScreen = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.push('/signIn');
			} else if (!loading && user) {
				initUserChatData(user).then((user) => {
					listenUserChatData(user.id);
				});
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
