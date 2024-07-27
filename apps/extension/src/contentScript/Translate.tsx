import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TranslateBox from '@peakee/features/TranslateBox';

import { type Position, requestTranslateViaMessaging } from './utils';

export const Translate = () => {
	const [translatePosition, setTranslatePosition] = useState<Position>();
	const [selectedText, setSelectedText] = useState('');
	const translateBoxRef = useRef(null);

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

	return (
		<View style={styles.container}>
			{translatePosition && (
				<TranslateBox
					ref={translateBoxRef}
					style={[translatePosition, styles.translateBox]}
					contentFontSize={18}
					initText={selectedText}
					translate={requestTranslateViaMessaging}
					experimentalDynamicSize
					collapsible
					collapse
				/>
			)}
		</View>
	);
};

export default Translate;

const styles = StyleSheet.create({
	container: {},
	translateBox: {
		minWidth: 300,
		maxWidth: 800,
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		paddingVertical: 18,
		borderWidth: 1.6,
		borderColor: '#DADADA',
		borderRadius: 10,
	},
});
