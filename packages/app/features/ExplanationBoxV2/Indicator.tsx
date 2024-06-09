import { type FC, useEffect, useRef, useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import type { WrappedDragLayoutRectangle } from './shared';

type Props = {
	index: number;
	dragLayout?: WrappedDragLayoutRectangle;
	/**
	 * will be triggered if overlap happen even it's a nearly overlap
	 */
	onHighlight?: (index: number) => void;
};

const overlapOffset = 20;

export const Indicator: FC<Props> = ({ index, dragLayout, onHighlight }) => {
	const ref = useRef<View>(null);
	const layout = useRef<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		if (!layout.current || !dragLayout) return;
		const isOverlapWithOffset =
			layout.current.y > dragLayout.y + overlapOffset &&
			layout.current.y < dragLayout.y + dragLayout.height - overlapOffset;
		const isNearlyDrag =
			index === dragLayout.index || index === dragLayout.index + 1;

		if (isOverlapWithOffset) {
			onHighlight?.(index);
		}

		if (isOverlapWithOffset && !isNearlyDrag) {
			setHighlight(true);
		} else {
			setHighlight(false);
		}
	}, [dragLayout]);

	useEffect(() => {
		setTimeout(() => {
			ref.current?.measure((x, y, width, height) => {
				layout.current = { x, y, width, height };
			});
		}, 0);
	}, [index]);

	return (
		<View
			ref={ref}
			style={[styles.indicator, highlight && styles.highlightIndicator]}
		/>
	);
};

export default Indicator;

const styles = StyleSheet.create({
	indicator: {
		height: 3,
		borderRadius: 20,
		backgroundColor: 'transparent',
		marginHorizontal: 14,
	},
	highlightIndicator: {
		backgroundColor: '#a7a7a7',
	},
});
