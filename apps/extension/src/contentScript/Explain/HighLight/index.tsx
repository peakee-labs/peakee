import { type FC, Fragment, useState } from 'react';

import type { WrappedDOMRect } from '../../utils';

import Line from './Line';

type Props = {
	rects: WrappedDOMRect[];
};

export const Highlight: FC<Props> = ({ rects }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<Fragment>
			{rects
				.filter((wr) => wr.rect.width > 5)
				.map((wr, index) => {
					if (index <= currentIndex) {
						return (
							<Line
								key={index}
								top={
									window.scrollY +
									wr.rect.top +
									wr.rect.height
								}
								left={window.scrollX + wr.rect.left}
								width={wr.rect.width}
								isPrimary={wr.type === 'main'}
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
