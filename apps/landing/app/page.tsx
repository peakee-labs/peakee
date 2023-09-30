import type { FC } from 'react';
import { Button, Header } from '@peakee/ui';

const Page: FC = () => {
	return (
		<>
			<Header text="Hello my docs" />
			<Button title="Hello world" />
		</>
	);
};

export default Page;
