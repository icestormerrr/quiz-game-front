import { QuizMode, QuizState } from "./types";

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
  },
});

export const { setQuizMode } = quizSlice.actions;
