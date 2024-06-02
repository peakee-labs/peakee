import { type FC, useRef } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputProps,
	TextInputSelectionChangeEventData,
} from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

type Props = Omit<TextInputProps, 'children' | 'value'> & {
	onPress?: () => void;
	onSelection?: (text: string, start: number, end: number) => void;
	children: string;
};

type Selection = {
	start: number;
	end: number;
};

export const SelectableText: FC<Props> = ({
	style,
	children,
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
		const isEmptySelection =
			e.nativeEvent.selection.end === e.nativeEvent.selection.start;
		if (isEmptySelection && isPreviousSelectionEmpty) {
			onPress?.();
		} else {
			const { start, end } = e.nativeEvent.selection;
			onSelection?.(children, start, end);
		}

		selectionRef.current = e.nativeEvent.selection;
	};

	return (
		<TextInput
			style={[styles.default, style]}
			value={children}
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
