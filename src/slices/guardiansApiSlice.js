import { apiSlice } from './apiSlice';
import { GUARDIANS_URL,BASE_URL } from '../constants';

export const guardiansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
allGuardians:builder.query({
      query:()=>({
      url: `${BASE_URL}/guardians/`, 
      }),
      keepUnusedDataFor:5
    }),
getGuardians:builder.query({
      query:(studentId)=>({
      url: `${BASE_URL}/students/${studentId}/guardians/`, 
      }),
      keepUnusedDataFor:5
    }),
verfication: builder.mutation({
      query: (formData) => ({
        url: GUARDIANS_URL,
        method: 'POST',
        body: formData,
        
      }),
    }),
removeGuardian: builder.mutation({
  query:({studentId,id})=>({
    url:`${BASE_URL}/students/${studentId}/guardians/${id}/`,
    method: 'DELETE',
  })
}),
deleteGuardian: builder.mutation({
  query:(id)=>({
    url:`${BASE_URL}/guardians/${id}/`,
    method: 'DELETE',
  })
}),
createLog: builder.mutation({
  query: (formData) => ({
    url: `${BASE_URL}/verify/create_log/`,
    method: 'POST',
    body: formData,
    
  }),
}),
getSingleGuardian:  builder.query({
  query: (GuardianId) => ({
    url: `${BASE_URL}/guardians/${GuardianId}/`,
}),
keepUnusedDataFor:5
}),
updateGuardian:  builder.mutation({
  query: ({guardianId,dataToSend}) => ({
    url: `${BASE_URL}/guardians/${guardianId}/`,
    method: 'PATCH',  
    body:dataToSend,
}),
}),


getMyStudents:builder.query({
  query:(guardianId)=>({
  url: `${BASE_URL}/guardians/${guardianId}/students/`, 
  }),
  keepUnusedDataFor:5
}),
removeStudent: builder.mutation({
query:({guardianId,id})=>({
url:`${BASE_URL}/guardians/${guardianId}/students/${id}/`,
method: 'DELETE',
})
}),


  })
})
export const { useAllGuardiansQuery,useGetGuardiansQuery, 
  useVerficationMutation, useRemoveGuardianMutation, 
  useDeleteGuardianMutation, useCreateLogMutation,
   useGetSingleGuardianQuery, useUpdateGuardianMutation, 
   useGetMyStudentsQuery,
    useRemoveStudentMutation} = guardiansApiSlice;


// export const { useCreateOrderMutation,
//   useGetOrderDetailsQuery,
//   usePayOrderMutation,
//   useGetPaypalClientIdQuery, useGetMyOrdersQuery} = orderApiSlice;