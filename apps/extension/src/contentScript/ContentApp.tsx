import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { logger } from '@peakee/logger';

import { Toolbox } from '../components';
import { getSystemThemeMode } from '../utils/theme';

import Explain from './Explain';
import Pin from './Pin';
import Translate from './Translate';
import { type Position, searchDictionary } from './utils';

logger().log('System theme mode', getSystemThemeMode());

export const ContentApp = () => {
	const [toolboxPosition, setToolboxPosition] = useState<Position>();
	const [showTranslate, setShowTranslate] = useState(false);
	const [showExplain, setShowExplain] = useState(false);

	useEffect(() => {
		const handleMouseUp = async function () {
			const selection = window.getSelection();
			if (!selection || selection.isCollapsed) {
				setToolboxPosition(undefined);
				setShowTranslate(false);
				setShowExplain(false);
			} else {
				handleSelect();
			}
		};

		document.addEventListener('mouseup', handleMouseUp);

		return () => document.removeEventListener('mouseup', handleMouseUp);
	}, []);

	const handleSelect = () => {
		const selection = window.getSelection();
		if (!selection) return;

		const range = selection.getRangeAt(0);
		const rects = range.getClientRects();
		const rect = rects[0];

		// rect might be undefined if the selection is from input component
		if (!rect) return;

		setToolboxPosition({
			left: window.scrollX + rect.x + rect.width - 60,
			top: window.scrollY + rect.y,
		});
	};

	const openSearchDictionary = () => {
		const selection = window.getSelection();
		if (!selection) return;
		const text = selection.toString();
		searchDictionary(text);
	};

	return (
		<View style={styles.container}>
			{toolboxPosition && (
				<View style={[styles.absolute, toolboxPosition]}>
					<Toolbox
						style={styles.toolBox}
						onPressTranslate={() => setShowTranslate(true)}
						onPressExplain={() => setShowExplain(true)}
						onPressDictionary={openSearchDictionary}
					/>
				</View>
			)}
			{showTranslate && <Translate />}
			{showExplain && <Explain />}

			<Pin />
		</View>
	);
};

export default ContentApp;

const styles = StyleSheet.create({
	container: {
		zIndex: 100000,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	absolute: {
		position: 'absolute',
	},
	toolBox: {
		position: 'absolute',
		bottom: 0,
	},
});
