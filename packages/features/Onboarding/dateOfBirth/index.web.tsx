import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';
import type { RootState } from '@peakee/state';
import { updateDateOfBirth, updateProgress } from '@peakee/state';
import type { FormDateOfBirth } from '@peakee/types';

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
		const date = new Date(data.dateOfBirth);
		if (date.getTime() > Date.now()) {
			setError('dateOfBirth', {
				type: 'validate',
				message: 'date of birth must be earlier than today',
			});
			return;
		}
		onNext && onNext();
		dispatch(updateDateOfBirth(data));
		dispatch(updateProgress(progress + 1));
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
							<input
								style={styles.inputDob}
								type="date"
								onInput={onChange}
								value={value}
							/>
						)}
						name="dateOfBirth"
					/>
					{errors.dateOfBirth && (
						<View style={styles.error}>
							<CircleExclaimation size={20} color={'#ff0000'} />
							<Text style={styles.errorMessage}>
								{errors.dateOfBirth?.message}
							</Text>
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
		width: '100%',
		flexDirection: 'row',
	},
	inputDob: {
		alignSelf: 'center',
		flex: 1,
		height: 50,
		borderWidth: 1,
		borderColor: '#222831',
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 5,
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
	errorMessage: {
		fontSize: 13,
		color: '#ff0000',
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		gap: 10,
		top: '50%',
		height: 20,
		alignItems: 'center',
		transform: [{ translateY: -10 }],
		right: 50,
	},
});

export default OnboardingDob;
