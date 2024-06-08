import type { Ref } from 'react';
import { forwardRef } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import type { Explanations } from '@peakee/app/api';

export type Props = {
	explanations: Explanations;
	style?: StyleProp<ViewStyle>;
	itemContainerStyle?: StyleProp<ViewStyle>;
	titleTextStyle?: StyleProp<TextStyle>;
	mainTextStyle?: StyleProp<TextStyle>;
	extendTextStyle?: StyleProp<TextStyle>;
};

export type Position = {
	left: number;
	top: number;
};

const _ExplanationBoxV2 = (
	{
		explanations,
		style,
		itemContainerStyle,
		titleTextStyle,
		mainTextStyle,
		extendTextStyle,
	}: Props,
	ref: Ref<View>,
) => {
	return (
		<View ref={ref} style={[styles.container, style]}>
			{explanations.map((e) => {
				return (
					<View
						key={e.key}
						style={[styles.itemContainer, itemContainerStyle]}
					>
						<Text style={[styles.titleTextStyle, titleTextStyle]}>
							{e.title}
						</Text>
						<Text style={[styles.mainTextStyle, mainTextStyle]}>
							{e.main}
						</Text>
						{e.extend && (
							<Text
								style={[
									styles.extendTextStyle,
									extendTextStyle,
								]}
							>
								{e.extend}
							</Text>
						)}
					</View>
				);
			})}
		</View>
	);
};

export const ExplanationBoxV2 = forwardRef<View, Props>(_ExplanationBoxV2);

export default ExplanationBoxV2;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 20,
		padding: 20,
		gap: 20,
	},
	itemContainer: {
		gap: 3,
	},
	titleTextStyle: {
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 3,
	},
	mainTextStyle: {
		fontSize: 16,
	},
	extendTextStyle: {
		fontSize: 16,
		fontWeight: '300',
		fontStyle: 'italic',
	},
});
