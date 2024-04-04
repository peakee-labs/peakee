import type { FC } from 'react';
import { useEffect } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import type { locale, reviewWord } from '../../types';
import useLocaleMap from '../../utils/hooks/useLocale';

type Props = {
	data: reviewWord;
	locale: locale;
};

type Content = Record<string, string>;

const localeMap: Record<locale, Content> = {
	'en-US': {
		synonyms: 'Synonyms',
	},
	en: {
		synonyms: 'Synonyms',
	},
	vi: {
		synonyms: 'Từ liên quan',
	},
};

export const ReviewWord: FC<Props> = ({ data, locale }) => {
	const { localize } = useLocaleMap(localeMap, locale, 'en');

	return (
		<View style={styles.reviewContainer}>
			<View style={styles.title}>
				{data.word.split('').map((c, idx) => {
					return (
						<Character
							key={idx}
							index={idx}
							style={styles.reviewText}
							character={c}
						/>
					);
				})}
			</View>
			<Text style={styles.explainText}>{data.explain}</Text>
			{data.synonyms && (
				<Text style={styles.synonyms}>
					{localize('synonyms')}: {data.synonyms.join(', ')}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	reviewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	title: {
		flexDirection: 'row',
		height: 100,
		justifyContent: 'flex-start',
		width: 'auto',
	},
	reviewText: {
		fontSize: 100,
		fontWeight: '600',
		textAlign: 'center',
	},
	explainText: {
		fontSize: 20,
		fontStyle: 'italic',
		fontWeight: '300',
		color: '#636363',
		textAlign: 'center',
	},
	synonyms: {
		fontSize: 20,
		fontWeight: '400',
		textAlign: 'center',
		textTransform: 'capitalize',
	},
});

type CharacterProps = {
	character: string;
	index: number;
	style: StyleProp<TextStyle>;
};

const Character: FC<CharacterProps> = ({ character, index, style }) => {
	const offset = useSharedValue(20);
	const opacity = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: -offset.value }],
			opacity: opacity.value,
		};
	});

	useEffect(() => {
		opacity.value = withTiming(1.0, { duration: index * 100 }, () => {
			offset.value = withTiming(0, { duration: 400 });
		});
	}, []);

	return (
		<Animated.Text style={[style, animatedStyles]}>
			{character}
		</Animated.Text>
	);
};
