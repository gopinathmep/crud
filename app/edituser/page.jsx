"use client";
import React from 'react'
import UserForm from '../components/UserForm'
import { useSearchParams } from 'next/navigation';

const EditUser = () => {
	const searchParams = useSearchParams();
	const userId = searchParams.get("id");
  return (
	<UserForm userId={userId} />
  )
}

export default EditUser;