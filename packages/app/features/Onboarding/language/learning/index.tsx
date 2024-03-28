import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';
import { Colors } from '@peakee/ui';

import type { RootState } from '../../../../state';
import { updateLearningLanguage, updateProgress } from '../../../../state';
import FlagBar from '../../FlagBar';
import NavigateBar from '../../NavigateBar';
import ProgressBar from '../../ProgressBar';

const mock: Array<{ isoCode: string; name: string }> = [
	{ isoCode: 'vn', name: 'vietnamese' },
	{ isoCode: 'gb', name: 'english' },
];

const OnboardingLearning = () => {
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const [active, setActive] = useState<Array<number>>(
		form.learnings.map((v) => mock.findIndex((vv) => vv.name == v)),
	);
	const [error, setError] = useState<Error | undefined>();

	const dispatch = useDispatch();

	const onSubmit = () => {
		const learnings = mock
			.filter((_, idx) => active.includes(idx))
			.map((v) => {
				return v.name;
			});
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
		if (active.includes(idx)) {
			setActive((curr) => curr.filter((v) => v != idx));
		} else {
			setActive((curr) => [...curr, idx]);
		}
		setError(undefined);
	};

	const onBack = () => {
		dispatch(updateProgress(progress - 1));
	};
	return (
		<View style={styles.container}>
			<ProgressBar current={progress} max={number} />
			<View style={styles.contentContainer}>
				<Text style={styles.title}>I&apos;m currently learning...</Text>
				<View style={styles.languageList}>
					{mock.map((item, idx) => (
						<FlagBar
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
			</View>
			<View style={styles.footer}>
				<NavigateBar onPrev={onBack} onNext={onSubmit} />
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 20,
	},
	contentContainer: {
		flex: 1,
		gap: 20,
	},
	languageList: {
		gap: 10,
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		gap: 10,
		height: 20,
		marginTop: 20,
		right: 10,
		alignItems: 'center',
	},
	errorText: {
		color: Colors.textError,
		textAlign: 'center',
	},
	title: {
		color: '#000000',
		fontSize: 28,
		fontWeight: '600',
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
