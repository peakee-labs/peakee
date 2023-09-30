import { Text } from 'react-native';
import { Button, Header } from '@peakee/ui';

import { app } from '../utils/firebase';

export default function Page(): JSX.Element {
	console.log(app);

	return (
		<>
			<Header text="Web" />
			<Button style={{ width: 100 }} title="Hello web" />
			<Text>Hello from new text 2</Text>
		</>
	);
}
