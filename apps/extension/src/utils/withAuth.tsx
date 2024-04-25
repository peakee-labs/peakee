import type { JSX } from 'react';
import { Fragment } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import SignInFeature from '@peakee/app/features/SignIn';
import type { RootState } from '@peakee/app/state';
import { Button } from '@peakee/ui';

import { signIn, signOut } from './auth';

type Configs = {
	showSignOut?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	signInBoxStyle?: StyleProp<ViewStyle>;
	signOutButtonStyle?: StyleProp<ViewStyle>;
};

export const withAuth = (
	WrappedComponent: () => JSX.Element,
	configs?: Configs,
) => {
	const Authorized = () => {
		const userProfile = useSelector(
			(state: RootState) => state.user.profile,
		);
		const profileLoading = useSelector(
			(state: RootState) => state.user.profileLoading,
		);

		const containerStyle = [styles.container, configs?.containerStyle];

		return (
			<Fragment>
				{profileLoading ? (
					<View style={containerStyle}>
						<ActivityIndicator />
					</View>
				) : !userProfile ? (
					<View style={containerStyle}>
						<SignInFeature
							style={[styles.signInBox, configs?.signInBoxStyle]}
							titleContainerStyle={styles.signInTitleStyle}
							onPressSignIn={signIn}
						/>
					</View>
				) : (
					<Fragment>
						<WrappedComponent />
						{configs?.showSignOut && (
							<Button
								style={[
									styles.signOutButton,
									configs?.signOutButtonStyle,
								]}
								title="Sign out"
								onPress={signOut}
							/>
						)}
					</Fragment>
				)}
			</Fragment>
		);
	};

	return Authorized;
};

export default withAuth;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	signInBox: {
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
		justifyContent: 'space-between',
	},
	signInTitleStyle: {
		gap: 20,
	},
	signOutButton: {
		width: 100,
	},
});
