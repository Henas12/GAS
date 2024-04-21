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





logs:builder.query({
  query:(studentId)=>({
  url: `${BASE_URL}/students/${studentId}/logs/`, 
  }),
  keepUnusedDataFor:5
}),

grade:builder.query({
  query:()=>({
  url: `${BASE_URL}/sections/`, 
  }),
  keepUnusedDataFor:5
}),


})
});

export const { useGetStudentsQuery, useGetSingleStudentQuery, 
  useUpdateStudentMutation, useDeleteSudentMutation,
  useLogsQuery, useGradeQuery} = studentApiSlice;