import { AnyAction, Reducer } from "redux";
import produce from "immer";

import { QuizMode, QuizResult, QuizState } from "./types";
import { QuizActionTypes } from "./actions";

const initialState: QuizState = {
  quiz: {
    questions: [],
    mode: QuizMode.Easy,
  },
  quizResults: [],
  quizLastResult: {} as QuizResult,
};

const reducer: Reducer<QuizState> = (state: QuizState = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QuizActionTypes.SET_QUIZ_QUESTIONS:
        draft.quiz.questions = action.questions;
        break;

      case QuizActionTypes.SET_QUIZ_MODE:
        draft.quiz.mode = action.mode;
        break;

      case QuizActionTypes.SET_QUIZ_RESULTS:
        draft.quizResults = action.results;
        break;

      case QuizActionTypes.ADD_QUIZ_RESULT:
        draft.quizResults.push(action.result);
        draft.quizResults = draft.quizResults.sort((resultA, resultB) => resultB.result - resultA.result).slice(0, 4);
        break;

      case QuizActionTypes.SET_QUIZ_LAST_RESULT:
        draft.quizLastResult = action.result;
        break;

      default:
        return state;
    }
  });

export { reducer as quizReducer };
