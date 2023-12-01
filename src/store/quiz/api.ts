import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_ENDPOINT } from "../../config";
import { Question, QuizMode } from "./types";

export const quizAPI = createApi({
  reducerPath: "quizAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: (build) => ({
    getQuestions: build.query<Question[], { number: number; mode: QuizMode; skipCache?: boolean }>({
      query: ({ number, mode, skipCache = true }) => ({
        url: `/questions`,
        params: {
          number,
          mode,
        },
      }),
    }),
  }),
});

export const { useGetQuestionsQuery } = quizAPI;
