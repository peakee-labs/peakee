import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ExplainPhraseInSentenceResponse } from '@peakee/api';
import ExplanationBox from '@peakee/features/ExplanationBox';

import type { Position, WrappedDOMRect } from '../utils';
import {
	requestExplainViaMessage,
	retrieveSentenceOfWordsInSingleRange,
} from '../utils';
import { withForwardRef } from '../utils/withForwardRef';

import { Highlight } from './HighLight';

export const Explain = withForwardRef((_, ref) => {
	const [rects, setRects] = useState<WrappedDOMRect[]>([]);
	const [highlight, setHighlight] = useState<boolean>(false);
	const [explanation, setExplanation] =
		useState<ExplainPhraseInSentenceResponse>();
	const [explanationBoxPosition, setExplanationBoxPosition] =
		useState<Position>();

	const startExplain = async () => {
		const selection = window.getSelection();
		if (!selection) return;

		const result = retrieveSentenceOfWordsInSingleRange(selection);
		if (!result) return;

		const { phrase, wrappedRects, sentence } = result;
		setRects(wrappedRects);
		setExplanationBoxPosition({
			top:
				window.scrollY +
				wrappedRects[wrappedRects.length - 1].rect.top +
				wrappedRects[wrappedRects.length - 1].rect.height +
				10,
			left: window.scrollX + wrappedRects[0].rect.left,
		});
		setHighlight(true);

		const explanation = await requestExplainViaMessage(phrase, sentence);
		if (explanation) {
			setExplanation(explanation);
		}
	};

	useEffect(() => {
		startExplain();
	}, []);

	return (
		<View ref={ref} style={styles.container}>
			{highlight && rects && <Highlight rects={rects} />}

			{explanation && explanationBoxPosition && (
				<ExplanationBox
					style={styles.explanationBox}
					position={explanationBoxPosition}
					explanation={explanation}
				/>
			)}
		</View>
	);
});

export default Explain;

const styles = StyleSheet.create({
	container: {},
	explanationBox: {
		position: 'absolute',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		width: 360,
		paddingBottom: 50,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: '#B1B6C1',
	},
});
