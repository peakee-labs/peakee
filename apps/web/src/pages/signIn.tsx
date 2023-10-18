import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@peakee/ui';
import { useRouter } from 'next/router';

import { signIn } from '../utils/auth';
import { useAuth } from '../utils/hooks';

const SignIn: FC = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee web</Text>
			<Button
				style={{ marginBottom: 10 }}
				title="Sign in with Google"
				onPress={signIn}
			/>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	h1: {
		fontSize: 30,
		fontWeight: '500',
	},
});
