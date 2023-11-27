import { combineReducers } from "redux";

import { quizReducer } from "./quiz/reducer";
import { QuizState } from "./quiz/types";

export interface ApplicationState {
  quiz: QuizState;
}

export const rootReducer = combineReducers({
  quiz: quizReducer,
});
