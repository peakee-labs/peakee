import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';

import { type RootState, updateCountry, updateProgress } from '../../../state';
import FlagBar from '../FlagBar';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const mock: Array<{ isoCode: string; name: string }> = [
	{ isoCode: 'vn', name: 'Viet Nam' },
	{ isoCode: 'gb', name: 'England' },
	{ isoCode: 'us', name: 'United State' },
	{ isoCode: 'jp', name: 'Japan' },
];

const OnboardingCountry = () => {
	const [active, setActive] = useState<number>(-1);
	const [error, setError] = useState<Error | undefined>();
	const { progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);

	const dispatch = useDispatch();
	const onSubmit = (country?: string) => () => {
		if (country) {
			console.log(country);
			dispatch(updateCountry(country));
			dispatch(updateProgress(progress + 1));
		} else {
			setError({
				name: 'country',
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
			<Text style={styles.title}>I&apos;m currently living in...</Text>
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
					<CircleExclaimation color={'#ff0000'} size={15} />
				</View>
			) : undefined}
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
		gap: 30,
	},
	languageList: {
		flexDirection: 'column',
		gap: 10,
	},
	title: {
		color: '#000000',
		fontSize: 27,
	},
	error: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		gap: 10,
	},
	errorText: {
		color: '#ff0000',
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
});
export default OnboardingCountry;
