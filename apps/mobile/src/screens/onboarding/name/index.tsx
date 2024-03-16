import { Controller, useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import { NavigateBar, ProgressBar } from '../components';
import { type FormName, type OnboardingValue, FormState } from '../store';

const dimension = Dimensions.get('window');
const OnboardingName = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: FormState.useState((s) => s),
	});

	const navigation = useNavigation();

	const onSubmit = (data: FormName) => {
		navigation.navigate('OnboardingStep2' as never);
		FormState.update((s: OnboardingValue) => {
			s.progress += 1;
			s.firstName = data.firstName;
			s.lastName = data.lastName;
		});
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
							<FontAwesomeIcon icon={faCircleExclamation} />
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
	inputName: {
		alignSelf: 'center',
		width: dimension.width * 0.9,
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
	},
	error: {
		position: 'absolute',
		flexDirection: 'row',
		gap: 10,
		right: 10,
		top: 16,
	},
});

export default OnboardingName;
