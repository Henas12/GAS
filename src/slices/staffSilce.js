import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },

    resetuser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },


  },
});
export const { setuser, resetuser } = userSlice.actions;
export default userSlice.reducer;  