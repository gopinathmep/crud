'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formConfig } from '../formConfig';

export default function UserForm({ userId = null }) {
	const dispatch = useDispatch();
	const router = useRouter();

	const isEditMode = !!userId;

	const [submitError, setSubmitError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedState, setSelectedState] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	const stateCityMap = {
		Kerala: ['Trivandrum', 'Kochi', 'Calicut'],
		Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
		TamilNadu: ['Chennai', 'Coimbatore', 'Madurai'],
		Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
	};

	const cityOptions = selectedState ? stateCityMap[selectedState] || [] : [];
	const [currentData, setCurrentData] = useState({});

	useEffect(() => {
		if (isEditMode) {
			fetch(`http://localhost:8000/users/${userId}`)
				.then(res => res.json())
				.then(data => {
					reset(data);
					setSelectedState(data.state);
					setTimeout(() => {
						setValue('city', data.city);
					}, 0);
				})
				.catch(() => setSubmitError("Failed to load user data."));
		}
	}, [isEditMode, reset, userId, setValue]);
	

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const response = await fetch(
				`http://localhost:8000/users${isEditMode ? `/${userId}` : ''}`,
				{
					method: isEditMode ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const result = await response.json();
			dispatch(isEditMode ? updateUser(result) : addUser(result));

			reset();
			router.push('/');
		} catch (error) {
			setSubmitError('Failed to submit. Try again later.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 shadow rounded">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{submitError && (
					<div className="alert alert-error">
						<span>{submitError}</span>
					</div>
				)}

				<input
					type="text"
					placeholder="Name"
					className="input input-bordered w-full"
					{...register("name", {
						required: "Name is required",
						minLength: { value: formConfig.name.minLength, message: `Min ${formConfig.name.minLength} characters` },
						maxLength: { value: formConfig.name.maxLength, message: `Max ${formConfig.name.maxLength} characters` },
					})}
					disabled={isEditMode && !formConfig.name.editable}
				/>
				{errors.name && (
					<div className="alert alert-error py-1">
						<span>{errors.name.message}</span>
					</div>
				)}

				<input
					type="email"
					placeholder="Email"
					className="input input-bordered w-full"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Enter a valid email address",
						}
					})}
					disabled={isEditMode && !formConfig.email.editable}
				/>
				{errors.email && (
					<div className="alert alert-error py-1">
						<span>{errors.email.message}</span>
					</div>
				)}

				<div className="flex flex-col sm:flex-row gap-4">
					<input
						type="text"
						placeholder="LinkedIn URL"
						className="input input-bordered w-full"
						{...register("linkedIn", {
							required: "LinkedIn URL is required",
							pattern: {
								value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
								message: "Enter a valid LinkedIn URL",
							},
						})}
					/>
					<select
						className="select select-bordered w-full sm:w-1/3"
						{...register("gender", { required: "Gender is required" })}
					>
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>
				{(errors.linkedIn || errors.gender) && (
					<div className="alert alert-error py-1">
						<span>{errors.linkedIn?.message || errors.gender?.message}</span>
					</div>
				)}

				<input
					type="text"
					placeholder="Address Line 1"
					className="input input-bordered w-full"
					{...register("address.line1", { required: "Address Line 1 is required" })}
				/>
				{errors.address?.line1 && (
					<div className="alert alert-error py-1">
						<span>{errors.address.line1.message}</span>
					</div>
				)}

				<input
					type="text"
					placeholder="Address Line 2"
					className="input input-bordered w-full"
					{...register("address.line2")}
				/>

				<div className="flex gap-4">
					<select
						className="select select-bordered w-full"
						{...register("state", { required: "State is required" })}
						onChange={(e) => {
							const selected = e.target.value;
							setSelectedState(selected);
							if(isEditMode) {
								setValue('city', currentData.city)
							}
							else{
								setValue('city', "")
							}
						}}
					>
						<option value="">Select State</option>
						{Object.keys(stateCityMap).map((state) => (
							<option key={state} value={state}>{state}</option>
						))}
					</select>

					<select
						className="select select-bordered w-full"
						{...register("city", { required: "City is required" })}
						disabled={!selectedState}
					>
						<option value="">Select City</option>
						{cityOptions.map((city) => (
							<option key={city} value={city}>{city}</option>
						))}
					</select>
				</div>
				{(errors?.state || errors?.city) && (
					<div className="alert alert-error py-1">
						<span>{errors?.state?.message || errors?.city?.message}</span>
					</div>
				)}

				<input
					type="text"
					placeholder="PIN Code"
					className="input input-bordered w-full"
					{...register("zipcode", {
						required: "PIN Code is required",
						pattern: {
							value: /^[1-9][0-9]{5}$/,
							message: "Enter a valid 6-digit PIN code",
						},
					})}
				/>
				{errors?.zipcode && (
					<div className="alert alert-error py-1">
						<span>{errors.zipcode.message}</span>
					</div>
				)}

				<button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update User' : 'Add User')}
				</button>
			</form>
		</div>
	);
}
