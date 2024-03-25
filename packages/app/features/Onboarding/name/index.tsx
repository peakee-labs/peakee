import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CircleExclaimation } from '@peakee/icons';

import type { RootState } from '../../../state';
import { updateName, updateProgress } from '../../../state';
import type { FormName } from '../../../types';
import type { OnboardingProps } from '..';
import NavigateBar from '../NavigateBar';
import ProgressBar from '../ProgressBar';

const OnboardingName: FC<OnboardingProps> = ({ onNext, onPrev }) => {
	const { form, progress, number } = useSelector(
		(state: RootState) => state.onboarding,
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: form,
	});

	const dispatch = useDispatch();
	const onSubmit = (data: FormName) => {
		dispatch(
			updateName({ lastName: data.lastName, firstName: data.firstName }),
		);
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
			<Text style={styles.title}>My name is...</Text>
			<View style={styles.contentContainer}>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.inputName}
								placeholder={'First name'}
								value={value}
								placeholderTextColor={'#31363F'}
								onBlur={onBlur}
								onChangeText={onChange}
							/>
						)}
						name="firstName"
					/>
					{errors.firstName && (
						<View style={styles.error}>
							<Text>First name is required</Text>
							<CircleExclaimation size={15} color={'#FF0000'} />
						</View>
					)}
				</View>
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.inputName}
								placeholder={'Last name'}
								placeholderTextColor={'#31363F'}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="lastName"
					/>
					{errors.lastName && (
						<View style={styles.error}>
							<Text>Last name is required</Text>
							<CircleExclaimation size={15} color={'#FF0000'} />
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
		paddingVertical: 20,
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
	inputName: {
		alignSelf: 'center',
		width: '100%',
		paddingHorizontal: 20,
		height: 50,
		borderWidth: 1,
		borderColor: '#222831',
		borderRadius: 5,
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
		right: 10,
		top: 16,
	},
});

export default OnboardingName;
