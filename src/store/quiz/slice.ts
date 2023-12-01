import { QuizMode, QuizResult, QuizState } from "./types";

import { MAX_RESULTS_COUNT } from "../../config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: QuizState = {
  mode: QuizMode.Easy,
  results: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizMode: (state, action: PayloadAction<QuizMode>) => {
      state.mode = action.payload;
    },
    setQuizResults: (state, action: PayloadAction<QuizResult[]>) => {
      state.results = action.payload;
    },
    addQuizResult: (state, action: PayloadAction<QuizResult>) => {
      state.results.push(action.payload);
      state.results = state.results
        .sort((resultA, resultB) => resultB.result - resultA.result)
        .slice(0, MAX_RESULTS_COUNT);
    },
  },
});

export const { setQuizMode, setQuizResults, addQuizResult } = quizSlice.actions;
