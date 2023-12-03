import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_ENDPOINT } from "../../config";
import { QuizResult } from "./types";

export const resultsAPI = createApi({
  reducerPath: "resultsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  tagTypes: ["Results"],
  endpoints: (build) => ({
    getResults: build.query<QuizResult[], void>({
      query: () => ({
        url: `/results`,
      }),
      providesTags: ["Results"],
    }),
    addResult: build.mutation<QuizResult, QuizResult>({
      query: (result) => ({
        url: `/results`,
        method: "POST",
        body: result,
      }),
      invalidatesTags: ["Results"],
    }),
    deleteResult: build.mutation<{ message: string }, string>({
      query: (resultId) => ({
        url: `/results/${resultId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Results"],
    }),
  }),
});

export const { useGetResultsQuery, useAddResultMutation, useDeleteResultMutation } = resultsAPI;
