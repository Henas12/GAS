import { apiSlice } from './apiSlice';
import { BASE_URL } from '../constants';
export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    
    getStudents:  builder.query({
      query: () => ({
        url: `${BASE_URL}/students/`,
  }),
  keepUnusedDataFor:5
  }),
  getSingleStudent:  builder.query({
    query: (studentId) => ({
      url: `${BASE_URL}/students/${studentId}/`,
}),
keepUnusedDataFor:5
}),
  updateStudent:  builder.mutation({
    query: ({studentId,dataToSend}) => ({
      url: `${BASE_URL}/students/${studentId}/`,
      method: 'PATCH',  
      body:dataToSend,
}),
}),
deleteSudent: builder.mutation({
  query: (studentId) => ({
    url: `${BASE_URL}/students/${studentId}/`,
    method: 'DELETE',
  }),
}),








})
});

export const { useGetStudentsQuery, useGetSingleStudentQuery, 
  useUpdateStudentMutation, useDeleteSudentMutation,
  } = studentApiSlice;