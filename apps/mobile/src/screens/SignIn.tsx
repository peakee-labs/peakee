import { StyleSheet, View } from 'react-native';
import { signInWithGoogle } from '@peakee/auth';
import SignInFeature from '@peakee/features/SignIn';
import { SafeAreaContainer } from '@peakee/ui';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const user = await signInWithGoogle();
		if (user) {
			navigation.navigate('Home', { screen: 'Chat' });
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
