import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TranslateBox } from '@peakee/features/TranslateBox';
import { ArrowRightV2 } from '@peakee/icons';

import { Input } from '../components';

const SidePanel: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Peakee Panel</Text>
			<Text style={styles.title}>Translation</Text>
			<TranslateBox
				style={styles.translateContainer}
				contentFontSize={16}
			/>

			<Text style={styles.title}>Quick Ask</Text>
			<Input
				suffixPlaceholder="tiếng Anh là gì?"
				suffix={
					<TouchableOpacity>
						<ArrowRightV2 strokeWidth="3" color={'#a4a4a4'} />
					</TouchableOpacity>
				}
			/>

			<Text style={styles.title}>Quick Note</Text>
			<Text style={styles.description}>
				Store your note and review anytime!
			</Text>
			<Input
				suffix={
					<TouchableOpacity>
						<ArrowRightV2 strokeWidth="3" color={'#a4a4a4'} />
					</TouchableOpacity>
				}
			/>
		</View>
	);
};

export default SidePanel;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		// backgroundColor: '#3C3C3C',
		paddingVertical: 6,
		paddingBottom: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	headerText: {
		marginTop: 6,
		textAlign: 'center',
		fontSize: 14,
		fontWeight: '600',
	},
	title: {
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 6,
		fontWeight: '500',
	},
	description: {
		marginTop: -4,
		marginBottom: 10,
		marginLeft: 6,
		fontSize: 14,
		fontWeight: '400',
		opacity: 0.6,
	},
	translateContainer: {
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 20,
		padding: 10,
	},
});
