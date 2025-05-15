import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  gameType: '', // shared across all users
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setGameType: (state, action) => {
      state.gameType = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, setGameType, deleteUser } = userSlice.actions;
export default userSlice.reducer;
