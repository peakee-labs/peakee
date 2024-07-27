import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { initAuthPromise, signInWithGoogle } from '@peakee/auth';
import { getJWT } from '@peakee/auth/jwt';
import SignInFeature from '@peakee/features/SignIn';

type Configs = {
	customSignIn?: () => Promise<void>;
	containerStyle?: StyleProp<ViewStyle>;
	signInBoxStyle?: StyleProp<ViewStyle>;
};

export const withAuth = (Component: FC, configs?: Configs) => {
	const Authorized = () => {
		const [loading, setLoading] = useState(true);
		const [signedIn, setSignedIn] = useState(false);

		const handleSignIn = async () => {
			if (configs?.customSignIn) {
				await configs.customSignIn();
			} else {
				await signInWithGoogle();
			}
		};

		const containerStyle = [styles.container, configs?.containerStyle];

		useEffect(() => {
			initAuthPromise.then(() => {
				setLoading(false);
				const jwt = getJWT();
				if (jwt) setSignedIn(true);
			});
		}, []);

		return (
			<Fragment>
				{!loading && !signedIn ? (
					<View style={containerStyle}>
						<SignInFeature
							style={[styles.signInBox, configs?.signInBoxStyle]}
							titleContainerStyle={styles.signInTitleStyle}
							onPressSignIn={handleSignIn}
						/>
					</View>
				) : (
					<Component />
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
});
