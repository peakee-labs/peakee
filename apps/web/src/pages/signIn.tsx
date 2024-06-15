import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { signInWithGoogle } from '@peakee/auth';
import SignInFeature from '@peakee/features/SignIn';
import { useAuth } from '@peakee/utils/hooks';
import { useWrappedDimensions } from '@peakee/utils/hooks';
import { useRouter } from 'next/router';

const SignIn: FC = () => {
	const { user } = useAuth();
	const router = useRouter();
	const { width } = useWrappedDimensions();

	const containerStyle =
		width < 500 ? styles.fullContainer : styles.boxContainer;

	const handleSignIn = async () => {
		await signInWithGoogle();
	};

	useEffect(() => {
		if (user) router.push('/');
	}, [user]);

	return (
		<SignInFeature
			style={containerStyle}
			titleContainerStyle={styles.titleContainer}
			onPressSignIn={handleSignIn}
		/>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	boxContainer: {
		width: 460,
		marginVertical: 'auto',
		paddingVertical: 60,
		paddingHorizontal: 40,
		gap: 100,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
	},
	fullContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});
