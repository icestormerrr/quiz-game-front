import { AnyAction, Reducer } from "redux";
import produce from "immer";

import { QuizMode, QuizState } from "./types";
import { QuizActionTypes } from "./actions";
import { MAX_RESULTS_COUNT } from "../../config";

const initialState: QuizState = {
  loading: false,
  error: null,
  questions: [],
  mode: QuizMode.Easy,
  results: [],
};

const reducer: Reducer<QuizState> = (state: QuizState = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QuizActionTypes.SET_QUIZ_QUESTIONS:
        draft.questions = action.questions;
        break;

      case QuizActionTypes.SET_QUIZ_MODE:
        draft.mode = action.mode;
        break;

      case QuizActionTypes.SET_QUIZ_LOADING:
        draft.loading = action.loading;
        break;

      case QuizActionTypes.SET_QUIZ_ERROR:
        draft.error = action.error;
        break;

      case QuizActionTypes.SET_QUIZ_RESULTS:
        draft.results = action.results;
        break;

      case QuizActionTypes.ADD_QUIZ_RESULT:
        draft.results.push(action.result);
        draft.results = draft.results
          .sort((resultA, resultB) => resultB.result - resultA.result)
          .slice(0, MAX_RESULTS_COUNT);
        break;

      default:
        return state;
    }
  });

export { reducer as quizReducer };
