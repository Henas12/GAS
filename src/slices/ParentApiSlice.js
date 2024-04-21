import { apiSlice } from './apiSlice';
import { GUARDIANS_URL,BASE_URL } from '../constants';

export const guardiansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
allParents:builder.query({
      query:()=>({
      url: `${BASE_URL}/parents/`, 
      }),
      keepUnusedDataFor:5
    }),
getParents:builder.query({
      query:(studentId)=>({
      url: `${BASE_URL}/students/${studentId}/remove_parent/`, 
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
removeParent: builder.mutation({
  query:({studentId,id})=>({
    url:`${BASE_URL}/students/${studentId}/remove_parent/`,
    method: 'POST',
    body: {'parent_id': id},
  })
}),
deleteParent: builder.mutation({
  query:(id)=>({
    url:`${BASE_URL}/parents/${id}/`,
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
getSingleParent:  builder.query({
  query: (GuardianId) => ({
    url: `${BASE_URL}/parents/${GuardianId}/`,
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
export const { useAllParentsQuery,useGetParentsQuery, 
  useVerficationMutation, useRemoveParentMutation, 
  useDeleteParentMutation, useCreateLogMutation,
   useGetSingleParentQuery, useUpdateGuardianMutation, 
   useGetMyStudentsQuery,
    useRemoveStudentMutation} = guardiansApiSlice;


// export const { useCreateOrderMutation,
//   useGetOrderDetailsQuery,
//   usePayOrderMutation,
//   useGetPaypalClientIdQuery, useGetMyOrdersQuery} = orderApiSlice;