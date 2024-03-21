// import { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { err } from 'react-native-svg';
// import { useNavigation } from '@react-navigation/native';

// import { NavigateBar } from '../components';
// import LanguageBar from '../components/languageBar';
// import type { OnboardingValue } from '../store';
// import { FormState } from '../store';
// const mock: Array<{ isoCode: string; name: string }> = [
// 	{ isoCode: 'vn', name: 'vietnamese' },
// 	{ isoCode: 'gb', name: 'english' },
// ];

// const OnboardingLanguage = () => {
// 	const [active, setActive] = useState<number>(-1);
// 	const [error, setError] = useState<Error | undefined>();
// 	const navigation = useNavigation();

// 	const onSubmit = (native?: string) => () => {
// 		if (native) {
// 			console.log(native);
// 			FormState.update((s: OnboardingValue) => {
// 				s.progress += 1;
// 				s.native = native;
// 			});
// 			navigation.navigate('OnboardingStep4' as never);
// 		} else {
// 			setError({
// 				name: 'language',
// 				message: "Let' tell me your native",
// 			});
// 		}
// 	};
// 	const toggleActive = (idx: number) => () => {
// 		setActive((curr) => (curr == idx ? -1 : idx));
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
// 						isActive={idx == active}
// 					/>
// 				))}
// 			</View>
// 			{error ? <Text>{error.message}</Text> : undefined}
// 			<View>
// 				<NavigateBar
// 					onPrev={onBack}
// 					onNext={onSubmit(mock[active]?.name)}
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
// export default OnboardingLanguage;
