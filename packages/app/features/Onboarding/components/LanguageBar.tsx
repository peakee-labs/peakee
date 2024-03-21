import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import CountryFlag from 'react-native-country-flag';

interface LanguageBarProps {
	isoCode: string; // ISO-3166 format
	name: string;
	onPress: () => void;
	isActive: boolean;
}
const dimension = Dimensions.get('window');

const LanguageBar = ({
	isActive,
	onPress,
	isoCode,
	name,
}: LanguageBarProps) => {
	let containerStyle;
	if (isActive) {
		containerStyle = { ...styles.container, ...styles.active };
	} else {
		containerStyle = styles.container;
	}

	return (
		<Pressable onPress={onPress} style={containerStyle}>
			<CountryFlag isoCode={isoCode} size={30} style={styles.flag} />
			<Text style={styles.name}>{name}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: dimension.width * 0.9,
		alignSelf: 'center',
		height: 50,
		borderColor: '#000000',
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 10,
		gap: 10,
	},
	active: {
		borderColor: '#FF7670',
	},
	flag: {},
	name: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
});

export default LanguageBar;
