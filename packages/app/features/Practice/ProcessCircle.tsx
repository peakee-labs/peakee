import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Props = {
	title?: string;
	percent: number;
	color: ColorValue;
};

export const ProcessCircle: FC<Props> = ({ title, percent, color }) => {
	return (
		<View style={styles.container}>
			<AnimatedCircularProgress
				size={110}
				width={7}
				fill={percent}
				tintColor={color as never}
				backgroundColor="#D9D9D9"
			>
				{() => (
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
						<Text style={[styles.percent, { color }]}>
							{percent.toFixed(1)}%
						</Text>
					</View>
				)}
			</AnimatedCircularProgress>
		</View>
	);
};

export default ProcessCircle;

const styles = StyleSheet.create({
	container: {},
	titleContainer: {
		alignItems: 'center',
	},
	title: {
		position: 'absolute',
		top: -10,
		fontSize: 12,
		fontWeight: '500',
		color: '#7B7B7B',
	},
	percent: {
		top: 6,
		fontSize: 28,
		fontWeight: '800',
	},
});
