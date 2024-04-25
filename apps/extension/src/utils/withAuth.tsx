import type { JSX } from 'react';
import { Fragment } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import SignInFeature from '@peakee/app/features/SignIn';
import type { RootState } from '@peakee/app/state';

import { signIn } from './auth';

export const withAuth = (WrappedComponent: () => JSX.Element) => {
	const Authorized = () => {
		const userProfile = useSelector(
			(state: RootState) => state.user.profile,
		);
		const profileLoading = useSelector(
			(state: RootState) => state.user.profileLoading,
		);

		return (
			<Fragment>
				{profileLoading ? (
					<View style={styles.container}>
						<ActivityIndicator />
					</View>
				) : !userProfile ? (
					<View style={styles.container}>
						<SignInFeature
							style={styles.signInBox}
							onPressSignIn={signIn}
						/>
					</View>
				) : (
					<WrappedComponent />
				)}
			</Fragment>
		);
	};

	return Authorized;
};

export default withAuth;

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
		paddingHorizontal: 20,
		paddingBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	signInBox: {
		width: 460,
		paddingVertical: 60,
		paddingHorizontal: 40,
		gap: 100,
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
	},
});
