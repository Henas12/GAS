import { apiSlice } from './apiSlice';
import { BASE_URL } from '../constants';

export const registrationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    studentRegistration: builder.mutation({
      query: (formDatas) => ({
        url: `${BASE_URL}/student_reg/`,
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
    }),


    video: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/video/`,
        method: 'POST',
        body: data,
        
      }),
    }),
   parentRegistration: builder.mutation({
      query: (parentFormDatas) => ({
        url: `${BASE_URL}/parents/`,
        method: 'POST',
        body:parentFormDatas,
        
      }),


  }),
  homeRTRegistration: builder.mutation({
    query: (teacherData) => ({
      url: `${BASE_URL}/hrts/`,
      method: 'POST',
      body:teacherData,
      
    }),


}),

authenticatorRegistration: builder.mutation({
  query: (authenticatorData) => ({
    url: `${BASE_URL}/authenticator/`,
    method: 'POST',
    body:authenticatorData,
    
  }),


  


}),

assignParent: builder.query({
  query: (studentId) => ({
    url: `${BASE_URL}/students/${studentId}/assign_parent/`,
  }),
  keepUnusedDataFor: 5,
}),


parentFromExisting: builder.mutation({
  query: ({studentId,data}) => ({
    url: `${BASE_URL}/students/${studentId}/assign_parent/`,
    method: 'POST',
    body: data,
    
  }),
}),




newParentAssign: builder.mutation({
  query: (data) => ({
    url: `${BASE_URL}/parents/activate/`,
    method: 'POST',
    body: data,
    
  }),
}),
})
})
export const { useStudentRegistrationMutation, 
  useGuardianRegistrationMutation,useGetGuardianQuery, 
  useGuardianFromExistingMutation, useVideoMutation, 
  useParentRegistrationMutation, useHomeRTRegistrationMutation,
   useAuthenticatorRegistrationMutation,
   useAssignParentQuery,
  useParentFromExistingMutation,
  useNewParentAssignMutation
  } = registrationApiSlice;
