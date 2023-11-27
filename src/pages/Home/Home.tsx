import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { QuizMode } from "../../store/quiz/types";
import { ApplicationState } from "../../store";
import { setQuizMode, setQuizResults } from "../../store/quiz/actions";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import Button from "../../components/Button/Button";
import Select, { Option } from "../../components/Select/Select";

import classes from "./Home.module.scss";

const ModeOptions: Option<QuizMode>[] = [
  { label: "Лёгкий", value: QuizMode.Easy },
  { label: "Средний", value: QuizMode.Medium },
  { label: "Сложный", value: QuizMode.Hard },
];

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizResults = useSelector((state: ApplicationState) => state.quiz.results);

  const mode = useSelector((state: ApplicationState) => state.quiz.mode);

  const modeOption = useMemo<Option<QuizMode>>(
    () => ModeOptions.find((opt) => opt.value === mode) || ({} as Option),
    [mode],
  );

  const handleModeChange = (newOption: Option) => {
    dispatch(setQuizMode(newOption.value));
  };

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleClearResults = () => {
    dispatch(setQuizResults([]));
  };

  return (
    <>
      <Select value={modeOption} onChange={handleModeChange} options={ModeOptions} />

      <ScoreBoard results={quizResults} />

      <div className={classes.buttonGroup}>
        <Button title={"Перейти к викторине"} onClick={handleStartQuiz} className={classes.startQuizButton} />
        <Button
          title={"Ø"}
          hint={"Очистить результаты"}
          onClick={handleClearResults}
          className={classes.clearResultsButton}
        />
      </div>
    </>
  );
};

export default Home;
