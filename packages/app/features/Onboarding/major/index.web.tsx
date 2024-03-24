import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { CircleExclaimation } from '@peakee/icons';

import { type RootState, updateMajor, updateProgress } from '../../../state';
import type { OnboardingProps } from '..';
import { NavigateBar, ProgressBar } from '../components';

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

type SelectOption = {
	value: string;
	label: string;
};

const OnboardingMajor: FC<OnboardingProps> = ({ onNext, onPrev }) => {
	const { form, progress, number } = useSelector(
		(root: RootState) => root.onboarding,
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { major: { value: '', label: '' } as SelectOption },
	});
	const dispatch = useDispatch();

	const onSubmit = ({ major }: { major: SelectOption }) => {
		dispatch(updateMajor(major.value));
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
							<Select
								options={majors.map((v, _) => {
									return {
										value: v,
										label: v,
									} as SelectOption;
								})}
								onChange={onChange}
								onFocus={onBlur}
								value={value}
							/>
						)}
						name="major"
					/>
					{errors.major && (
						<View style={styles.error}>
							<Text>Last name is required</Text>
							<CircleExclaimation size={10} color={'#000000'} />
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
		paddingHorizontal: 40,
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
		width: '90%',
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
		gap: 10,
		right: 10,
		top: 16,
	},
});

export default OnboardingMajor;
