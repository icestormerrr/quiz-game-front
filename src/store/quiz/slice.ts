import { Question, QuizMode, QuizResult, QuizState } from "./types";

import { MAX_RESULTS_COUNT } from "../../config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestQuizQuestions } from "./actions";

const initialState: QuizState = {
  loading: false,
  error: false,
  questions: [],
  mode: QuizMode.Easy,
  results: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizMode: (state, action: PayloadAction<QuizMode>) => {
      state.mode = action.payload;
    },
    setQuizLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQuizError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setQuizQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
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

  extraReducers: (builder) => {
    builder
      .addCase(requestQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.questions = [];
      })
      .addCase(requestQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(requestQuizQuestions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default quizSlice;
