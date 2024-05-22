import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';
import { Colors } from '@peakee/ui';

import {
	type RootState,
	updateNativeLanguage,
	updateProgress,
} from '../../../state';
import FlagBar from '../FlagBar';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const mock: Array<{ isoCode: string; name: string }> = [
	{ isoCode: 'vn', name: 'vietnamese' },
	{ isoCode: 'gb', name: 'english' },
];

const OnboardingLanguage = () => {
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);

	const [active, setActive] = useState<number>(
		mock.findIndex((v) => v.name == form.native),
	);
	const [error, setError] = useState<Error | undefined>();

	const dispatch = useDispatch();
	const onSubmit = (native?: string) => () => {
		if (native) {
			console.log(native);
			dispatch(updateNativeLanguage(native));
			dispatch(updateProgress(progress + 1));
		} else {
			setError({
				name: 'language',
				message: "Let' tell me your native",
			});
		}
	};
	const toggleActive = (idx: number) => () => {
		setActive((curr) => (curr == idx ? -1 : idx));
		setError(undefined);
	};

	const onBack = () => {
		dispatch(updateProgress(progress - 1));
	};
	return (
		<View style={styles.container}>
			<ProgressBar current={progress} max={number} />
			<View style={styles.contentContainer}>
				<Text style={styles.title}>My native language is...</Text>
				<View style={styles.languageList}>
					{mock.map((item, idx) => (
						<FlagBar
							key={idx}
							isoCode={item.isoCode}
							name={item.name}
							onPress={toggleActive(idx)}
							isActive={idx == active}
						/>
					))}
				</View>
				{error ? (
					<View style={styles.error}>
						<Text style={styles.errorText}>{error.message}</Text>
						<CircleExclaimation
							color={Colors.textError}
							size={15}
						/>
					</View>
				) : undefined}
			</View>
			<View style={styles.footer}>
				<NavigateBar
					onPrev={onBack}
					onNext={onSubmit(mock[active]?.name)}
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
		gap: 20,
	},
	contentContainer: {
		flex: 1,
		gap: 20,
	},
	languageList: {
		width: '100%',
		flexDirection: 'column',
		gap: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: '600',
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
	footer: {
		bottom: 10,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
});
export default OnboardingLanguage;
