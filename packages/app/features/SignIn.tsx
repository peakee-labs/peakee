import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAssets } from '../utils';

type Props = {
	onPressSignIn: () => void;
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
	const { assets } = useAssets();

	return (
		<View style={style}>
			<View style={[styles.titleContainer, titleContainerStyle]}>
				<Text style={styles.titleText}>Peakee</Text>
				<Image
					style={styles.titleImage}
					source={assets?.authImage}
					resizeMode="contain"
				/>
			</View>
			<TouchableOpacity
				style={[styles.signInButton, buttonStyle]}
				onPress={onPressSignIn}
			>
				<Image style={styles.googleImage} source={assets?.google} />
				<Text style={styles.signInText}>Continue with Google</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignInFeature;

const styles = StyleSheet.create({
	titleContainer: {
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
