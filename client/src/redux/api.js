import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
  }),
  tagTypes: ["Report", "Job"],
  endpoints: (builder) => ({
    submitSingleReport: builder.mutation({
      query: (data) => ({
        url: "/report",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Report"],
    }),
    submitBulkReports: builder.mutation({
      query: (data) => ({
        url: "/reports/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Report", "Job"],
    }),
    getJobStatus: builder.query({
      query: (jobId) => `/job-status/${jobId}`,
      providesTags: (result, error, jobId) => [{ type: "Job", id: jobId }],
    }),
    getDashboardStats: builder.query({
      query: (month) => ({
        url: "/dashboard",
        params: { month },
      }),
      providesTags: ["Report"],
    }),
  }),
});

export default api;
export const {
  useSubmitSingleReportMutation,
  useSubmitBulkReportsMutation,
  useGetJobStatusQuery,
  useGetDashboardStatsQuery,
} = api;
