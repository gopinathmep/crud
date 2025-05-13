import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
users: [],
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		addUser: (state, action) => {
            state.users.push(action.payload);
        },
		updateUser: (state, action) => {
			const { id, updates } = action.payload;
			const index = state.users.findIndex((u) => u.id === id);
			if (index !== -1) {
				state.users[index] = { ...state.users[index], ...updates };
			}
		},
		deleteUser: (state, action) => {
			state.users = state.users.filter((user) => user.id !== action.payload);
		}
	}
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
