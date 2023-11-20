import {createStore, combineReducers, Reducer} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {quizReducer} from "./quiz/reducer";
import {QuizState} from "./quiz/types";

export interface ApplicationState {
  quiz: QuizState;
}

export const rootReducer = combineReducers({
  quiz: quizReducer
});



