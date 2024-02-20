import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentInfo: localStorage.getItem('studentInfo')
    ? JSON.parse(localStorage.getItem('studentInfo'))
    : null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.studentInfo = action.payload;
      localStorage.setItem('studentInfo', JSON.stringify(action.payload));
    },

    resetStudent: (state, action) => {
      state.studentInfo = null;
      localStorage.removeItem('studentInfo');
    },


  },
});
export const { setStudent, resetStudent } = studentSlice.actions;
export default studentSlice.reducer;  // has to be imported to the store