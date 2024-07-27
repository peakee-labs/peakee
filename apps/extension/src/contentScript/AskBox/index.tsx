import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@peakee/ui';

import type { Position } from '../types';

export type AskContext = {
	selection: string;
	context: string;
	start: number;
	end: number;
};

type Props = {
	context: AskContext;
	position: Position;
};

const InternalAskBox = (
	{ context: { selection, context }, position }: Props,
	ref: Ref<View>,
) => {
	return (
		<View ref={ref} style={[styles.container, position]}>
			<View style={styles.contextContainer}>
				<Text style={styles.selection}>{selection}</Text>
				<Text style={styles.context}>{context}</Text>
			</View>

			<View style={styles.inputAskContainer}>
				<TextInput
					style={styles.input}
					placeholder="Ask for something"
					placeholderTextColor={'#B1B6C1'}
				/>
				<Button title="Ask" />
			</View>
		</View>
	);
};

export const AskBox = forwardRef<View, Props>(InternalAskBox);

export default AskBox;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: 440,
		minHeight: 200,
		backgroundColor: '#ffffff',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
	contextContainer: {
		flex: 1,
		gap: 4,
	},
	selection: {
		fontSize: 16,
		fontWeight: '500',
	},
	context: {
		fontStyle: 'italic',
	},
	inputAskContainer: {
		flexDirection: 'row',
		gap: 4,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#B1B6C1',
		padding: 6,
		borderRadius: 20,
		outlineStyle: 'none',
	} as never,
});
