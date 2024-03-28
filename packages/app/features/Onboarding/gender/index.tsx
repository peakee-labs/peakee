import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect, { type Item } from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';
import { Colors } from '@peakee/ui';

import type { RootState } from '../../../state';
import { updateGender, updateProgress } from '../../../state';
import type { FormGender } from '../../../types';
import type { OnboardingProps } from '..';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const genders: Array<string> = ['male', 'female', 'unknown'];
const OnboardingGender: FC<OnboardingProps> = ({ onPrev, onNext }) => {
	const { form, progress, number } = useSelector(
		(state: RootState) => state.onboarding,
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { gender: form.gender } as FormGender,
	});
	const dispatch = useDispatch();

	const onSubmit = (data: FormGender) => {
		dispatch(updateGender(data));
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
			<Text style={styles.title}>My gender identity...</Text>
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
								placeholder={{
									label: 'Gender',
									value: 'unknown',
								}}
								// onValueChange={onChange}
								onValueChange={onChange}
								onClose={onBlur}
								items={genders.map((m, _) => ({
									// key: idx,
									label: m,
									value: m,
								}))}
								value={value}
							/>
						)}
						name="gender"
					/>
					{errors.gender && (
						<View style={styles.error}>
							<CircleExclaimation
								size={20}
								color={Colors.textError}
							/>
							<Text style={styles.errorMessage}>
								{errors.gender?.message
									? errors.gender.message
									: 'Please select your gender identity'}
							</Text>
						</View>
					)}
				</View>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerMessage}>
					Please select the option that best represents your gender
					identity. If you prefer not to disclose, you can select
					&quot;Unknown&quot;.
				</Text>
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
	},
	title: {
		color: Colors.textBlack,
		fontSize: 28,
		fontWeight: '600',
	},
	contentContainer: {
		flexDirection: 'column',
		flex: 1,
		gap: 20,
		height: 'auto',
	},
	inputContainer: {
		position: 'relative',
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		zIndex: 20,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
		gap: 10,
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center',
		right: 20,
		height: 20,
		transform: [{ translateY: -10 }],
		top: '50%',
		gap: 10,
	},
	errorMessage: {
		color: Colors.textError,
		fontSize: 13,
	},
	footerMessage: {
		fontSize: 12,
		textAlign: 'center',
		alignSelf: 'center',
		fontWeight: '500',
		width: '80%',
		color: Colors.textBlack,
	},
	inputGender: {
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
		borderWidth: 0,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: styles.inputGender,
	inputAndroid: styles.inputGender,
	inputWeb: styles.inputGender,
});
export default OnboardingGender;
