import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';

import type { RootState } from '../../../state';
import { updateDateOfBirth, updateProgress } from '../../../state';
import type { FormDateOfBirth } from '../../../types';
import type { OnboardingProps } from '..';
import { NavigateBar, ProgressBar } from '../components';
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
		onNext();
		dispatch(updateDateOfBirth(data));
		dispatch(updateProgress(progress + 1));
	};

	const onBack = () => {
		dispatch(updateProgress(progress - 1));
		onPrev();
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
								onChange={onChange}
								value={value}
							/>
						)}
						name="dateOfBirth"
					/>
					{errors.dateOfBirth && (
						<View>
							<CircleExclaimation size={20} color={'000000'} />
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
		backgroundColor: '#ffffff',
	},
	title: {
		color: '#222831',
		fontSize: 28,
		fontWeight: '600',
		marginBottom: 20,
	},
	contentContainer: {
		flexDirection: 'column',
		gap: 20,
		height: 'auto',
	},
	inputContainer: {
		position: 'relative',
	},
	inputDob: {
		alignSelf: 'center',
		width: '90%',
		paddingHorizontal: 20,
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
		gap: 10,
		bottom: -20,
	},
});

export default OnboardingDob;
