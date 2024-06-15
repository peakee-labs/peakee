import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Book, Message, Noti, User, Users } from '@peakee/icons';
import type { IconProps } from '@peakee/icons/components/types';
import { Avatar } from '@peakee/ui';
import { useAuth, useWrappedDimensions } from '@peakee/utils/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function withAuth<P>(WrappedComponent: ComponentType<P>) {
	const AuthenticatedScreen = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.push('/signIn');
			}
		}, [user, loading]);

		return loading || !user ? (
			<View style={styles.authContainer}>
				{/* TODO: need to resolve by root layout  */}
				<ActivityIndicator style={{ width: 20, height: 20 }} />
			</View>
		) : (
			<WrappedComponent {...props} as never />
		);
	};

	return AuthenticatedScreen;
}

export function withBottomNavigation<P>(WrappedComponent: ComponentType<P>) {
	const Wrapper = (props: P) => {
		const { user } = useAuth();
		const { width } = useWrappedDimensions();
		const router = useRouter();
		const { pathname } = router;
		const active = '#FF9F00';
		const base = '#484C52';

		return (
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<WrappedComponent {...props} as never />
				</View>

				{width < 700 && (
					<View style={styles.bottomNavigationContainer}>
						{navigationItems.map(
							({ component: Component, path }) => {
								const color = pathname === path ? active : base;
								return (
									<Link href={path} key={path}>
										<Component
											size={28}
											color={color}
											strokeWidth="2"
										/>
									</Link>
								);
							},
						)}

						<Link style={{ paddingBottom: 2 }} href={'/profile'}>
							{user ? (
								<Avatar
									size={34}
									source={{ uri: user.imageURL as never }}
								/>
							) : (
								<User
									color={'#484C52'}
									size={28}
									strokeWidth="2"
								/>
							)}
						</Link>
					</View>
				)}
			</View>
		);
	};

	return Wrapper;
}

const navigationItems: { component: FC<IconProps>; path: string }[] = [
	{
		component: Message,
		path: '/',
	},
	{
		component: Users,
		path: '/friends',
	},
	{
		component: Book,
		path: '/practice',
	},
	{
		component: Noti,
		path: '/notification',
	},
];

const styles = StyleSheet.create({
	authContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
	},
	bottomNavigationContainer: {
		flexDirection: 'row',
		paddingVertical: 16,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#F5F6F7',
	},
});
