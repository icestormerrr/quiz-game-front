import { API_ENDPOINT } from "../../config";
import { Question, QuizMode } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const requestQuizQuestions = createAsyncThunk<Question[], { number: number; mode: QuizMode }>(
  "quiz/requestQuestions",
  async (params, thunkAPI) => {
    const { number, mode } = params;

    const response = await fetch(`${API_ENDPOINT}/questions?number=${number}&mode=${mode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  },
);
