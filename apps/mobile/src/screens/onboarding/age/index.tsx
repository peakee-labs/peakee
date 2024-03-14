import { useRef } from 'react';
import type { ErrorOption, FieldErrors } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import { NavigateBar, ProgressBar } from '../components';
import { type FormDob, type OnboardingValue, FormState } from '../store';

const dimension = Dimensions.get('window');
const OnboardingAge = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: FormState.useState((s) => s),
	});

	const navigation = useNavigation();

	const onSubmit = (data: FormDob) => {
		if (data.dob.getTime() > Date.now()) {
			setError('dob', {
				type: 'validate',
				message: 'date of birth must be earlier than today',
			});
			return;
		}
		console.log('update dob', data.dob);
		FormState.update((s: OnboardingValue) => {
			s.progress += 1;
			s.dob = data.dob;
		});
		navigation.navigate('OnboardingStep3' as never);
	};

	const onBack = () => {
		FormState.update((s: OnboardingValue) => {
			s.progress -= 1;
		});
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<ProgressBar current={FormState.getRawState().progress} max={3} />
			<Text style={styles.title}>What is your age?</Text>
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
								date={value}
								mode="date"
							/>
						)}
						name="dob"
					/>
					{errors.dob && (
						<View style={styles.error}>
							<Text>
								Age is required,{' '}
								{errors.dob.message
									? errors.dob?.message
									: 'hehe'}
							</Text>
							<FontAwesomeIcon icon={faCircleExclamation} />
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
		width: dimension.width * 0.9,
		paddingHorizontal: 20,
	},
	footer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		gap: 10,
		bottom: -20,
	},
});

export default OnboardingAge;
