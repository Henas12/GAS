import { apiSlice } from './apiSlice';
import { GUARDIANS_URL,BASE_URL } from '../constants';

export const guardiansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
allTeachers:builder.query({
      query:()=>({
      url: `${BASE_URL}/hrts/`, 
      }),
      keepUnusedDataFor:5
    }),
    deleteTeacher: builder.mutation({
      query:(id)=>({
        url:`${BASE_URL}/hrts/${id}/`,
        method: 'DELETE',
      })
    }),


    getSingleTeacher:  builder.query({
      query: (GuardianId) => ({
        url: `${BASE_URL}/hrts/${GuardianId}/`,
    }),
    keepUnusedDataFor:5
    }),
   

    assignSection: builder.mutation({
      query: (formData) => ({
        url:  `${BASE_URL}/hrts/manage_grade/`,
        method: 'POST',
        body: formData,
        
      }),

  
}),


// removeSection: builder.mutation({
//   query: (formData) => ({
//     url:  `${BASE_URL}/hrts/manage_grade/`,
//     method: 'PATCH',
//     body: formData,
    
//   }),


// }),


activateTeacher: builder.mutation({
  query: (formData) => ({
    url:  `${BASE_URL}/hrts/activate/`,
    method: 'POST',
    body: formData,
    
  }),
})


  })

})
export const { useAllTeachersQuery, useDeleteTeacherMutation,useGetSingleTeacherQuery,useAssignSectionMutation, useActivateTeacherMutation} = guardiansApiSlice;
