import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import TranslateBox from '@peakee/features/TranslateBox';

import { withForwardRef } from './utils/withForwardRef';
import { type Position, requestTranslateViaMessaging } from './utils';

export const Translate = withForwardRef((_, ref) => {
	const [translatePosition, setTranslatePosition] = useState<Position>();
	const [selectedText, setSelectedText] = useState('');

	const startTranslate = () => {
		const selection = window.getSelection();
		if (!selection) return;
		const text = selection.toString();
		setSelectedText(text.trim());
		const rect = selection.getRangeAt(0).getBoundingClientRect();
		setTranslatePosition({
			top: window.scrollY + rect.top + rect.height + 10,
			left: window.scrollX + rect.left,
		});
	};

	useEffect(() => {
		startTranslate();
	}, []);

	if (!translatePosition) return null;

	return (
		<TranslateBox
			ref={ref}
			style={[translatePosition, styles.container]}
			contentFontSize={18}
			initText={selectedText}
			translate={requestTranslateViaMessaging}
			experimentalDynamicSize
			collapsible
			collapse
		/>
	);
});

export default Translate;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		minWidth: 300,
		maxWidth: 800,
		backgroundColor: '#FFFFFF',
		paddingVertical: 18,
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 10,
	},
});
