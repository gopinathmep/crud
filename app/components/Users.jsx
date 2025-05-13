'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/slices/userSlice';
import Table from './Table';
import Link from 'next/link';

export default function Users({ initialUsers }) {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);

	useEffect(() => {
		dispatch(setUsers(initialUsers));
	}, [dispatch, initialUsers]);

	return (
		<>
			<div className='btn-container flex justify-end'>
				<Link href="/adduser" className='btn btn-primary btn-outline my-10'>Add User</Link>
			</div>
			<Table users={users} />
		</>
	);
}
