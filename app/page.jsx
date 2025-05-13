import Users from './components/Users';

async function fetchUsers() {
  const res = await fetch('http://localhost:8000/users');
  return res.json();
}

export default async function UsersPage() {
	const users = await fetchUsers();

	return (<Users initialUsers={users} />);
}
