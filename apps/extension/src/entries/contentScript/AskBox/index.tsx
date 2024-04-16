import type { Ref } from 'react';
import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
			<Text>{selection}</Text>
			<Text>{context}</Text>
			<Text>Ask for somethings</Text>
			<Text>Is it correct</Text>
		</View>
	);
};

export const AskBox = forwardRef<View, Props>(InternalAskBox);

export default AskBox;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: 400,
		backgroundColor: '#ffffff',
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 50,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
});
