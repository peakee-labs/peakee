import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';

import type { RootState } from '../../../state';
import { updateDateOfBirth, updateProgress } from '../../../state';
import type { FormDateOfBirth } from '../../../types';
import type { OnboardingProps } from '..';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const OnboardingDob: FC<OnboardingProps> = ({ onPrev, onNext }) => {
	const { form, progress, number } = useSelector(
		(state: RootState) => state.onboarding,
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: form,
	});
	const dispatch = useDispatch();

	const onSubmit = (data: FormDateOfBirth) => {
		if (new Date(data.dateOfBirth).getTime() > Date.now()) {
			setError('dateOfBirth', {
				type: 'validate',
				message: 'date of birth must be earlier than today',
			});
			return;
		}
		dispatch(updateDateOfBirth(data));
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
			<Text style={styles.title}>My birthday is on...</Text>
			<View style={styles.contentContainer}>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<DatePicker
								style={styles.inputDob}
								onDateChange={onChange}
								date={new Date(value)}
								mode="date"
							/>
						)}
						name="dateOfBirth"
					/>
					{errors.dateOfBirth && (
						<View style={styles.error}>
							<CircleExclaimation size={20} color={'#000000'} />
							<Text>{errors.dateOfBirth?.message}</Text>
						</View>
					)}
				</View>
			</View>
			<View style={styles.footer}>
				<NavigateBar
					onPrev={handleSubmit(onBack)}
					onNext={handleSubmit(onSubmit)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flex: 1,
		paddingHorizontal: 20,
		gap: 10,
		// backgroundColor: '#ffffff',
	},
	title: {
		color: '#222831',
		fontSize: 28,
		fontWeight: '600',
		marginBottom: 20,
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
	inputDob: {
		alignSelf: 'center',
		width: 900,
		paddingHorizontal: 20,
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		zIndex: 20,
		alignSelf: 'center',
		width: '100%',
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		gap: 10,
	},
});

export default OnboardingDob;
