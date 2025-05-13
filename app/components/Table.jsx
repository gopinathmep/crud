import React from 'react'
import TableRow from './TableRow';

const Table = ({users}) => {
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				<thead>
					<tr>
					<th>Name</th>
					<th>Email</th>
					<th>LinkedIn</th>
					<th>Gender</th>
					<th>Address</th>
					<th>Edit/Delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<TableRow key={index} user={user} />
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table;