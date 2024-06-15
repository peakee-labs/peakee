import { type FC, useRef } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputProps,
	TextInputSelectionChangeEventData,
} from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

export type Selection = {
	text: string;
	start: number;
	end: number;
};

export type OnSelectionFunction = (selection?: Selection) => void;

type Props = Omit<TextInputProps, 'children' | 'value'> & {
	onPress?: () => void;
	onSelection?: OnSelectionFunction;
	children: string;
};

export const SelectableText: FC<Props> = ({
	style,
	children: text,
	onPress,
	onSelection,
	...props
}) => {
	const selectionRef = useRef<Selection>();
	const handleSelectionChange = (
		e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
	) => {
		const isPreviousSelectionEmpty =
			selectionRef.current?.end === selectionRef.current?.start;

		const { start, end } = e.nativeEvent.selection;
		const isEmptySelection = end === start;
		const selection = { text, start, end };
		if (isEmptySelection && isPreviousSelectionEmpty) {
			onPress?.();
			onSelection?.(undefined);
		} else {
			onSelection?.(selection);
		}

		selectionRef.current = selection;
	};

	return (
		<TextInput
			style={[styles.default, style]}
			value={text}
			editable={true}
			multiline={true}
			onSelectionChange={handleSelectionChange}
			cursorColor={'transparent'}
			showSoftInputOnFocus={false}
			spellCheck={false}
			aria-checked={false}
			{...props}
		/>
	);
};

export default SelectableText;

const styles = StyleSheet.create({
	default: {
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
});
