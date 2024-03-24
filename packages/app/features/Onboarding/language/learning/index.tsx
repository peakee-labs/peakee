import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';

import type { RootState } from '../../../../state';
import { updateLearningLanguage, updateProgress } from '../../../../state';
import { NavigateBar, ProgressBar } from '../../components';
import LanguageBar from '../../components/LanguageBar';

// import LanguageBar from './languageBar';

const mock: Array<{ isoCode: string; name: string }> = [
	{ isoCode: 'vn', name: 'vietnamese' },
	{ isoCode: 'gb', name: 'english' },
];

const OnboardingLearning = () => {
	const [active, setActive] = useState<Array<number>>([]);
	const [error, setError] = useState<Error | undefined>();
	const { progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);

	const dispatch = useDispatch();
	const onSubmit = (learnings?: Array<string>) => () => {
		if (learnings && learnings.length != 0) {
			dispatch(updateLearningLanguage(learnings));
			dispatch(updateProgress(progress + 1));
		} else {
			setError({
				name: 'learnings',
				message: "Let' tell which languages you're learning",
			});
		}
	};
	const toggleActive = (idx: number) => () => {
		setActive((curr) =>
			curr.includes(idx)
				? curr.filter((v, _) => v != idx)
				: [...curr, idx],
		);
		setError(undefined);
	};

	const onBack = () => {
		dispatch(updateProgress(progress - 1));
	};
	return (
		<View style={styles.container}>
			<ProgressBar current={progress} max={number} />
			<Text style={styles.title}>I&apos;m currently learn...</Text>
			<View style={styles.languageList}>
				{mock.map((item, idx) => (
					<LanguageBar
						key={idx}
						isoCode={item.isoCode}
						name={item.name}
						onPress={toggleActive(idx)}
						isActive={active.includes(idx)}
					/>
				))}
			</View>
			{error ? (
				<View style={styles.error}>
					<Text style={styles.errorText}>{error.message}</Text>
					<CircleExclaimation color={'#ff0000'} size={15} />
				</View>
			) : undefined}
			<View style={styles.footer}>
				<NavigateBar
					onPrev={onBack}
					onNext={onSubmit(
						mock
							.filter((_, idx) => active.includes(idx))
							.map((v) => {
								return v.name;
							}),
					)}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 30,
	},
	languageList: {
		flexDirection: 'column',
		gap: 10,
	},
	error: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		gap: 10,
	},
	errorText: {
		color: '#ff0000',
	},
	title: {
		color: '#000000',
		fontSize: 27,
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
});
export default OnboardingLearning;
