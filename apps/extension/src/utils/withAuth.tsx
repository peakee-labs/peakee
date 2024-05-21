import type { JSX } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { initAuthPromise } from '@peakee/app';
import SignInFeature from '@peakee/app/features/SignIn';
import { Button } from '@peakee/ui';

import { signIn, signOut } from './auth';

type Configs = {
	customSignIn?: () => Promise<void>;
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
		const [loading, setLoading] = useState(true);
		const [signedIn, setSignedIn] = useState(false);

		useEffect(() => {
			initAuthPromise.then((user) => {
				setLoading(false);
				if (user) setSignedIn(true);
			});
		}, []);

		const containerStyle = [styles.container, configs?.containerStyle];

		return (
			<Fragment>
				{loading ? (
					<View style={containerStyle}>
						<ActivityIndicator />
					</View>
				) : !signedIn ? (
					<View style={containerStyle}>
						<SignInFeature
							style={[styles.signInBox, configs?.signInBoxStyle]}
							titleContainerStyle={styles.signInTitleStyle}
							onPressSignIn={configs?.customSignIn || signIn}
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
