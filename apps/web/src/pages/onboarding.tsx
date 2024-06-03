import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingFeature from '@peakee/app/features/Onboarding';
import { useRouter } from 'next/router';

import { useWrappedDimensions } from '../utils/hooks';

const SignIn: FC = () => {
	const router = useRouter();
	const { width } = useWrappedDimensions();

	const containerStyle =
		width < 800 ? styles.fullContainer : styles.boxContainer;

	return (
		<View style={containerStyle}>
			<OnboardingFeature
				onDone={() => {
					router.push('/');
				}}
			/>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	boxContainer: {
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
		alignSelf: 'center',
		marginVertical: 'auto',
		overflow: 'hidden',
		width: 600,
		minHeight: 700,
		height: 'auto',
	},
	fullContainer: {
		flex: 1,
	},
});
