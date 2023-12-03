import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { QuizMode } from "../../store/quiz/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setQuizMode } from "../../store/quiz/slice";
import { useDeleteResultMutation, useGetResultsQuery } from "../../store/results/api";
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
  const dispatch = useAppDispatch();

  const { data: results = [], isFetching: isResultsFetching } = useGetResultsQuery();
  const [deleteResult, { isLoading: isResultDeleting }] = useDeleteResultMutation();

  const mode = useAppSelector((state) => state.quiz.mode);
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
    results.forEach((res) => {
      deleteResult(res._id);
    });
  };

  return (
    <>
      <Select value={modeOption} onChange={handleModeChange} options={ModeOptions} />

      <ScoreBoard results={results} isLoading={isResultsFetching || isResultDeleting} />

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
