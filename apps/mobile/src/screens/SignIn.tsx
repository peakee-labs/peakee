import { StyleSheet, View } from 'react-native';
import SignInFeature from '@peakee/app/features/SignIn';
import { SafeAreaContainer } from '@peakee/ui';
import { useNavigation } from '@react-navigation/native';
import { signInWithGoogle } from 'utils/auth';

const SignInScreen = () => {
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const user = await signInWithGoogle();
		if (user) {
			navigation.navigate('Home', { screen: 'Conversations' });
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaContainer>
				<SignInFeature onPressSignIn={handleSignIn} />
			</SafeAreaContainer>
		</View>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FFFFFF',
	},
});
