// store/usersSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload);
      },
      prepare(userData) {
        return { payload: { id: nanoid(), ...userData } };
      },
    },
    updateUser(state, action) {
      const { id, ...userData } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...userData };
      }
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
