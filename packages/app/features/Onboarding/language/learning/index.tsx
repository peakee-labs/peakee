// import { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import { NavigateBar } from '../../components';
// import LanguageBar from '../../components/languageBar';
// import type { OnboardingValue } from '../../store';
// import { FormState } from '../../store';

// const mock: Array<{ isoCode: string; name: string }> = [
// 	{ isoCode: 'vn', name: 'vietnamese' },
// 	{ isoCode: 'gb', name: 'english' },
// ];

// const OnboardingLearning = () => {
// 	const [active, setActive] = useState<Array<number>>([]);
// 	const [error, setError] = useState<Error | undefined>();
// 	const navigation = useNavigation();

// 	const onSubmit = (learnings?: Array<string>) => () => {
// 		if (learnings && learnings.length != 0) {
// 			console.log(learnings);
// 			FormState.update((s: OnboardingValue) => {
// 				s.progress += 1;
// 				s.learnings = learnings;
// 			});
// 			navigation.navigate('OnboardingStep5' as never);
// 		} else {
// 			setError({
// 				name: 'learnings',
// 				message: "Let' tell me your native",
// 			});
// 		}
// 	};
// 	const toggleActive = (idx: number) => () => {
// 		setActive((curr) =>
// 			curr.includes(idx)
// 				? curr.filter((v, _) => v != idx)
// 				: [...curr, idx],
// 		);
// 		setError(undefined);
// 	};

// 	const onBack = () => {
// 		FormState.update((s: OnboardingValue) => {
// 			s.progress -= 1;
// 		});
// 		navigation.goBack();
// 	};
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>My native language is...</Text>
// 			<View style={styles.languageList}>
// 				{mock.map((item, idx) => (
// 					<LanguageBar
// 						key={idx}
// 						isoCode={item.isoCode}
// 						name={item.name}
// 						onPress={toggleActive(idx)}
// 						isActive={active.includes(idx)}
// 					/>
// 				))}
// 			</View>
// 			{error ? <Text>{error.message}</Text> : undefined}
// 			<View>
// 				<NavigateBar
// 					onPrev={onBack}
// 					onNext={onSubmit(
// 						mock
// 							.filter((_, idx) => active.includes(idx))
// 							.map((v) => {
// 								return v.name;
// 							}),
// 					)}
// 				/>
// 			</View>
// 		</View>
// 	);
// };
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingHorizontal: 20,
// 		paddingVertical: 20,
// 		gap: 30,
// 	},
// 	languageList: {
// 		flexDirection: 'column',
// 		gap: 10,
// 		flex: 1,
// 	},
// 	title: {
// 		color: '#000000',
// 		fontSize: 27,
// 	},
// 	footer: {},
// });
// export default OnboardingLearning;
