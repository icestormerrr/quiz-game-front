import { API_ENDPOINT } from "../../config";
import { Question, QuizMode, QuizResult } from "./types";

export enum QuizActionTypes {
  SET_QUIZ_QUESTIONS = "SET_QUIZ_QUESTIONS",
  SET_QUIZ_MODE = "SET_QUIZ_MODE",
  SET_QUIZ_RESULTS = "SET_QUIZ_RESULTS",
  ADD_QUIZ_RESULT = "ADD_QUIZ_RESULT",
}

export const requestQuizQuestions = (number: number, mode: QuizMode) => async (dispatch: any) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/questions?number=${number}&mode=${mode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setQuizQuestions(data));

    return { data };
  } catch (errors) {
    return { errors };
  }
};

export const setQuizQuestions = (questions: Question[]) => ({
  type: QuizActionTypes.SET_QUIZ_QUESTIONS,
  questions: questions,
});

export const setQuizMode = (mode: QuizMode) => ({
  type: QuizActionTypes.SET_QUIZ_MODE,
  mode: mode,
});

export const setQuizResults = (results: QuizResult[]) => ({
  type: QuizActionTypes.SET_QUIZ_RESULTS,
  results: results,
});

export const addQuizResult = (result: QuizResult) => ({
  type: QuizActionTypes.ADD_QUIZ_RESULT,
  result: result,
});
