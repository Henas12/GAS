import { apiSlice } from './apiSlice';
import { GUARDIANS_URL,BASE_URL } from '../constants';

export const guardiansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
allAuthenticators:builder.query({
      query:()=>({
      url: `${BASE_URL}/authenticator/`, 
      }),
      keepUnusedDataFor:5
    }),
    deleteAuthenticator: builder.mutation({
      query:(id)=>({
        url:`${BASE_URL}/authenticator/${id}/`,
        method: 'DELETE',
      })
    }),


    getSingleAuthenticator:  builder.query({
      query: (GuardianId) => ({
        url: `${BASE_URL}/authenticator/${GuardianId}/`,
    }),
    keepUnusedDataFor:5
    }),
   

    assignSection: builder.mutation({
      query: (formData) => ({
        url:  `${BASE_URL}/hrts/manage_grade/`,
        method: 'POST',
        body: formData,
        
      }),

    

  })
})
})
export const { useAllAuthenticatorsQuery, useDeleteAuthenticatorMutation,useGetSingleAuthenticatorQuery,useAssignSectionMutation} = guardiansApiSlice;


// export const { useCreateOrderMutation,
//   useGetOrderDetailsQuery,
//   usePayOrderMutation,
//   useGetPaypalClientIdQuery, useGetMyOrdersQuery} = orderApiSlice;