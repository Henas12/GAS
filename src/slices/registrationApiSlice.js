import { apiSlice } from './apiSlice';
import { BASE_URL } from '../constants';

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    studentRegistration: builder.mutation({
      query: (formDatas) => ({
        url: `${BASE_URL}/students/`,
        method: 'POST',
        body: formDatas,
        
      }),

     
    }),


    guardianRegistration: builder.mutation({
      query: ({studentId, guardianFormDatas}) => ({
        url: `${BASE_URL}/students/${studentId}/guardians/`,
        method: 'POST',
        body:guardianFormDatas,
        
      }),

      

     
    }),


    getGuardian: builder.query({
      query: (studentId) => ({
        url: `${BASE_URL}/students/${studentId}/guardians/add_guardian/`,
      }),
      keepUnusedDataFor: 5,
    }),


    guardianFromExisting: builder.mutation({
      query: ({studentId,data}) => ({
        url: `${BASE_URL}/students/${studentId}/guardians/add_guardian/`,
        method: 'POST',
        body: data,
        
      }),
    })



  })
})
export const { useStudentRegistrationMutation, useGuardianRegistrationMutation,useGetGuardianQuery, useGuardianFromExistingMutation } = registrationApiSlice;
