// import { Controller, useForm } from 'react-hook-form';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { useNavigation } from '@react-navigation/native';

// import { NavigateBar, ProgressBar } from '../components';
// import type { FormmMajor, OnboardingValue } from '../store';
// import { FormState } from '../store';

// const dimension = Dimensions.get('window');
// const majors = [
// 	'developer',
// 	'traveler',
// 	'blogger',
// 	'scientist',
// 	'teacher',
// 	'household',
// 	'driver',
// 	'musician',
// ];
// const OnboardingMajor = () => {
// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({ defaultValues: FormState.useState((s) => s) });
// 	const navigation = useNavigation();

// 	const onSubmit = (data: FormmMajor) => {
// 		FormState.update((s: OnboardingValue) => {
// 			s.progress += 1;
// 			s.major = data.major;
// 		});
// 		navigation.navigate('OnboardingDone' as never);
// 	};
// 	const onBack = () => {
// 		FormState.update((s: OnboardingValue) => {
// 			s.progress -= 1;
// 		});
// 		navigation.goBack();
// 	};

// 	return (
// 		<View style={styles.container}>
// 			<ProgressBar current={FormState.getRawState().progress} max={3} />
// 			<Text style={styles.title}>I&apos;m...</Text>
// 			<View style={styles.contentContainer}>
// 				<View style={styles.inputContainer}>
// 					<Controller
// 						control={control}
// 						rules={{
// 							required: true,
// 						}}
// 						render={({ field: { onChange, onBlur, value } }) => (
// 							<RNPickerSelect
// 								style={pickerSelectStyles}
// 								placeholder={{
// 									label: 'Major',
// 									value: '',
// 								}}
// 								onClose={onBlur}
// 								onValueChange={onChange}
// 								items={majors.map((m, idx) => ({
// 									key: idx,
// 									label: m,
// 									value: m,
// 								}))}
// 								value={value}
// 							/>
// 						)}
// 						name="major"
// 					/>
// 					{errors.major && (
// 						<View style={styles.error}>
// 							<Text>Last name is required</Text>
// 							<FontAwesomeIcon icon={faCircleExclamation} />
// 						</View>
// 					)}
// 				</View>
// 			</View>
// 			<View style={styles.footer}>
// 				<NavigateBar
// 					onPrev={handleSubmit(onBack)}
// 					onNext={handleSubmit(onSubmit)}
// 				/>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		paddingVertical: 10,
// 		flex: 1,
// 		paddingHorizontal: 20,
// 		gap: 10,
// 		backgroundColor: '#ffffff',
// 	},
// 	title: {
// 		color: '#222831',
// 		fontSize: 28,
// 		fontWeight: '600',
// 		marginBottom: 20,
// 	},
// 	contentContainer: {
// 		flexDirection: 'column',
// 		gap: 20,
// 		height: 'auto',
// 	},
// 	inputContainer: {
// 		position: 'relative',
// 	},
// 	inputName: {
// 		alignSelf: 'center',
// 		width: dimension.width * 0.9,
// 		paddingHorizontal: 20,
// 		height: 50,
// 		borderWidth: 1,
// 		borderColor: '#222831',
// 		borderRadius: 5,
// 	},
// 	footer: {
// 		position: 'absolute',
// 		bottom: 10,
// 		alignSelf: 'center',
// 	},
// 	error: {
// 		position: 'absolute',
// 		flexDirection: 'row',
// 		gap: 10,
// 		right: 10,
// 		top: 16,
// 	},
// });

// const pickerSelectStyles = StyleSheet.create({
// 	inputIOS: {
// 		fontSize: 16,
// 		paddingVertical: 12,
// 		paddingHorizontal: 10,
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 4,
// 		color: 'black',
// 		paddingRight: 30, // to ensure the text is never behind the icon
// 	},
// 	inputAndroid: {
// 		fontSize: 16,
// 		paddingHorizontal: 10,
// 		paddingVertical: 8,
// 		borderWidth: 0.5,
// 		borderColor: 'purple',
// 		borderRadius: 8,
// 		color: 'black',
// 		paddingRight: 30, // to ensure the text is never behind the icon
// 	},
// });
// export default OnboardingMajor;
