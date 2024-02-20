import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentInfo: localStorage.getItem('staffInfo')
    ? JSON.parse(localStorage.getItem('staffInfo'))
    : null,
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setstaff: (state, action) => {
      state.staffInfo = action.payload;
      localStorage.setItem('staffInfo', JSON.stringify(action.payload));
    },

    resetstaff: (state, action) => {
      state.staffInfo = null;
      localStorage.removeItem('staffInfo');
    },


  },
});
export const { setstaff, resetstaff } = staffSlice.actions;
export default staffSlice.reducer;  