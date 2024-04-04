import { type FC, Fragment, useState } from 'react';

import Line from './Line';

type Props = {
	rects: DOMRect[];
};

export const Highlight: FC<Props> = ({ rects }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<Fragment>
			{rects
				.filter((r) => r.width > 5)
				.map((rect, index) => {
					if (index <= currentIndex) {
						return (
							<Line
								key={index}
								top={rect.top + rect.height}
								left={rect.left}
								width={rect.width}
								onComplete={() => {
									setCurrentIndex(index + 1);
								}}
							/>
						);
					}
				})}
		</Fragment>
	);
};

export default Highlight;
