import { Text } from 'react-native';
import { Button, Header } from '@peakee/ui';

export default function Page(): JSX.Element {
	return (
		<>
			<Header text="Web" />
			<Button style={{ width: 100 }} title="Hello web" />
			<Text>Hello from new text 2</Text>
		</>
	);
}
