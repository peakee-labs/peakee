import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SignInFeature from '@peakee/app/features/SignIn';
import { useRouter } from 'next/router';

import { signIn } from '../utils/auth';
import { useAuth } from '../utils/hooks';
import { useWrappedDimensions } from '../utils/hooks';

const SignIn: FC = () => {
	const { user } = useAuth();
	const router = useRouter();
	const { width } = useWrappedDimensions();

	const containerStyle =
		width < 500 ? styles.fullContainer : styles.boxContainer;

	useEffect(() => {
		if (user) router.push('/');
	}, [user]);

	return (
		<View style={containerStyle}>
			<SignInFeature onPressSignIn={signIn} />
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	boxContainer: {
		paddingVertical: 100,
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
		alignSelf: 'center',
		marginVertical: 'auto',
	},
	fullContainer: {
		flex: 1,
	},
});
