import { type FC, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { assets } from '../utils';

type Props = {
	onPressSignIn: () => Promise<void>;
	style?: StyleProp<ViewStyle>;
	titleContainerStyle?: StyleProp<ViewStyle>;
	buttonStyle?: StyleProp<ViewStyle>;
};

const SignInFeature: FC<Props> = ({
	onPressSignIn,
	style,
	titleContainerStyle,
	buttonStyle,
}) => {
	const [loading, setLoading] = useState(false);

	const handlePressSignIn = async () => {
		setLoading(true);
		await onPressSignIn();
		setLoading(false);
	};

	return (
		<View style={[styles.container, style]}>
			<View style={[styles.titleContainer, titleContainerStyle]}>
				<Text style={styles.titleText}>Peakee</Text>
				<Image
					style={styles.titleImage}
					source={assets.authImage}
					resizeMode="contain"
				/>
			</View>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			) : (
				<TouchableOpacity
					style={[styles.signInButton, buttonStyle]}
					onPress={handlePressSignIn}
				>
					<Image style={styles.googleImage} source={assets.google} />
					<Text style={styles.signInText}>Continue with Google</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SignInFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		gap: 60,
	},
	titleText: {
		fontSize: 50,
		fontWeight: '900',
		color: '#FF7701',
		alignSelf: 'center',
	},
	titleImage: {
		width: '100%',
		height: 160,
		alignSelf: 'center',
	},
	loadingContainer: {
		height: 54,
	},
	signInButton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	signInText: {
		flex: 1,
		fontSize: 16,
		textAlign: 'center',
	},
	googleImage: {
		width: 30,
		height: 30,
	},
});
