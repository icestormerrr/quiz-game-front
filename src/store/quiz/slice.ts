import { Question, QuizMode, QuizResult, QuizState } from "./types";

import { MAX_RESULTS_COUNT } from "../../config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestQuizQuestions } from "./actions";

const initialState: QuizState = {
  loading: false,
  error: null,
  questions: [],
  mode: QuizMode.Easy,
  results: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizMode: (state: QuizState, action: PayloadAction<QuizMode>) => {
      state.mode = action.payload;
    },
    setQuizLoading: (state: QuizState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQuizError: (state: QuizState, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    setQuizResults: (state: QuizState, action: PayloadAction<QuizResult[]>) => {
      state.results = action.payload;
    },
    setQuizQuestions: (state: QuizState, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuizResult: (state: QuizState, action: PayloadAction<QuizResult>) => {
      state.results.push(action.payload);
      state.results = state.results
        .sort((resultA, resultB) => resultB.result - resultA.result)
        .slice(0, MAX_RESULTS_COUNT);
    },
  },
  extraReducers: {
    [requestQuizQuestions.fulfilled.type]: (state, action: PayloadAction<Question[]>) => {
      state.loading = false;
      state.error = null;
      state.questions = action.payload;
    },
    [requestQuizQuestions.pending.type]: (state) => {
      state.loading = true;
    },
    [requestQuizQuestions.rejected.type]: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default quizSlice;
