import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/slices/userSlice';

const TableRow = ({user}) => {

	const[showAddr, setShowAddr] = useState(false);

	const dispatch = useDispatch();

	const handleDelete = async (id) => {
		const confirmed = window.confirm('Are you sure you want to delete this user?');
		if (!confirmed) return;

		try {
			const res = await fetch(`http://localhost:8000/users/${id}`, {
				method: 'DELETE',
			});

			if (res.ok) {
				dispatch(deleteUser(id));
			} else {
				alert('Failed to delete the user');
			}
		} catch (error) {
			console.error(error);
			alert('An error occurred while deleting');
		}
	};

	return (
		<tr key={user.id}>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>{user.linkedIn}</td>
			<td>{user.gender}</td>
			<td>
				{
					<div className='address cursor-pointer' onClick={() => setShowAddr(!showAddr)}>
						{
							!showAddr ? 
								`${user.address.line1}, ${user.address.line2} ...`
								: (
									<div>
										{
											`${user.address.line1}, ${user.address.line2},`
										}
										<br/>
										{
											`${user.city} - ${user.zipcode}, ${user.state}`
										}
									</div>
								)
						}
					</div>
				}
			</td>
			<td>
				<Link href={`/edituser?id=${user.id}`} className="btn btn-neutral btn-outline mr-1">Edit</Link>
				<button onClick={() => handleDelete(user.id)} className="btn btn-accent btn-outline">Delete</button>
			</td>
		</tr>
	)
}

export default TableRow