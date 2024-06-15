import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect, { type Item } from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';
import { type RootState, updateMajor, updateProgress } from '@peakee/state';

import type { FormMajor } from '../../../types';
import type { OnboardingProps } from '..';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const majors = [
	'developer',
	'traveler',
	'blogger',
	'scientist',
	'teacher',
	'household',
	'driver',
	'musician',
];

const OnboardingMajor: FC<OnboardingProps> = ({ onNext, onPrev }) => {
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { major: form.major } as FormMajor });

	const dispatch = useDispatch();
	const onSubmit = (form: FormMajor) => {
		dispatch(updateMajor(form.major));
		dispatch(updateProgress(progress + 1));
		onNext && onNext();
	};
	const onBack = () => {
		dispatch(updateProgress(progress - 1));
		onPrev && onPrev();
	};

	return (
		<View style={styles.container}>
			<ProgressBar current={progress} max={number} />
			<Text style={styles.title}>I&apos;m...</Text>
			<View style={styles.contentContainer}>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<RNPickerSelect
								style={pickerSelectStyles}
								placeholder={
									{
										label: value != '' ? value : 'Major',
										value: value,
									} as Item
								}
								onClose={onBlur}
								onValueChange={onChange}
								items={majors.map((m, idx) => ({
									key: idx,
									label: m,
									value: m,
								}))}
								value={value}
							/>
						)}
						name="major"
					/>
					{errors.major && (
						<View style={styles.error}>
							<Text style={styles.errorText}>
								{errors.major.message
									? errors.major.message
									: 'Major is required'}
							</Text>
							<CircleExclaimation size={10} color={'#ff0000'} />
						</View>
					)}
				</View>
			</View>
			<View style={styles.footer}>
				<NavigateBar onPrev={onBack} onNext={handleSubmit(onSubmit)} />
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
		backgroundColor: '#ffffff',
	},
	title: {
		color: '#222831',
		fontSize: 28,
		fontWeight: '600',
	},
	contentContainer: {
		flexDirection: 'column',
		gap: 20,
		height: 'auto',
	},
	inputContainer: {
		position: 'relative',
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		top: '50%',
		right: 20,
		height: 20,
		transform: [{ translateY: -10 }],
	},
	errorText: {
		color: '#ff0000',
	},
	inputMajor: {
		fontSize: 16,
		paddingVertical: 8,
		textTransform: 'capitalize',
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		borderRadius: 5,
		paddingHorizontal: 20,
		alignSelf: 'center',
		width: '100%',
		height: 50,
		paddingLeft: 20,
		borderWidth: 1,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: styles.inputMajor,
	inputAndroind: styles.inputMajor,
	inputWeb: styles.inputMajor,
});
export default OnboardingMajor;
