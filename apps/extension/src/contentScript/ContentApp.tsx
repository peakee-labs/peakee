import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { logger } from '@peakee/logger';

import { Toolbox } from '../components';
import { getSystemThemeMode } from '../utils/theme';

import Explain from './Explain';
import Pin from './Pin';
import Translate from './Translate';
import {
	type Position,
	isInside,
	measure,
	openSearchDictionary,
} from './utils';

logger().log('System theme mode', getSystemThemeMode());

export const ContentApp = () => {
	const [toolboxPosition, setToolboxPosition] = useState<Position>();
	const [showTranslate, setShowTranslate] = useState(false);
	const [showExplain, setShowExplain] = useState(false);
	const translateRef = useRef<View>(null);
	const explainRef = useRef<View>(null);

	const handleMouseUp = useCallback(async function () {
		const selection = window.getSelection();
		const hasRef = explainRef.current || translateRef.current;
		if (selection && !selection.isCollapsed && !hasRef) {
			handleCurrentSelection();
		} else if (selection) {
			const { top, left, width, height } = selection
				.getRangeAt(0)
				.getBoundingClientRect();

			const selectedBox = {
				x: left + window.scrollX,
				y: top + window.scrollY,
				width,
				height,
			};

			if (explainRef.current) {
				const explain = await measure(explainRef.current);
				if (!isInside(selectedBox, explain)) {
					setShowExplain(false);
				}
			} else if (translateRef.current) {
				const translate = await measure(translateRef.current);
				if (!isInside(selectedBox, translate)) {
					setShowTranslate(false);
				}
			} else {
				setToolboxPosition(undefined);
			}
		}
	}, []);

	const handleCurrentSelection = () => {
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

	useEffect(() => {
		document.addEventListener('mouseup', handleMouseUp);
		return () => document.removeEventListener('mouseup', handleMouseUp);
	}, []);

	return (
		<View style={styles.container}>
			{showTranslate && <Translate ref={translateRef} />}
			{showExplain && <Explain ref={explainRef} />}

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
