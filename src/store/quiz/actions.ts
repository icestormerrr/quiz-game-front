import { API_ENDPOINT } from "../../config";
import { Question, QuizMode, QuizResult } from "./types";

export enum QuizActionTypes {
  SET_QUIZ_QUESTIONS = "SET_QUIZ_QUESTIONS",
  SET_QUIZ_MODE = "SET_QUIZ_MODE",
  SET_QUIZ_LOADING = "SET_QUIZ_LOADING",
  SET_QUIZ_ERROR = "SET_QUIZ_ERROR",
  SET_QUIZ_RESULTS = "SET_QUIZ_RESULTS",
  ADD_QUIZ_RESULT = "ADD_QUIZ_RESULT",
}

export const requestQuizQuestions = (number: number, mode: QuizMode) => async (dispatch: any) => {
  try {
    dispatch(setQuizLoading(true));
    dispatch(setQuizError(null));

    const response = await fetch(`${API_ENDPOINT}/questions?number=${number}&mode=${mode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    dispatch(setQuizQuestions(data));
  } catch (error) {
    dispatch(setQuizError(error as Error));
    //dispatch(setQuizQuestions([]));
  } finally {
    dispatch(setQuizLoading(false));
  }
};

export const setQuizQuestions = (questions: Question[]) => ({
  type: QuizActionTypes.SET_QUIZ_QUESTIONS,
  questions,
});

export const setQuizMode = (mode: QuizMode) => ({
  type: QuizActionTypes.SET_QUIZ_MODE,
  mode: mode,
});

export const setQuizLoading = (loading: boolean) => ({
  type: QuizActionTypes.SET_QUIZ_LOADING,
  loading,
});

export const setQuizError = (error: Error | null) => ({
  type: QuizActionTypes.SET_QUIZ_ERROR,
  error,
});

export const setQuizResults = (results: QuizResult[]) => ({
  type: QuizActionTypes.SET_QUIZ_RESULTS,
  results,
});

export const addQuizResult = (result: QuizResult) => ({
  type: QuizActionTypes.ADD_QUIZ_RESULT,
  result,
});
