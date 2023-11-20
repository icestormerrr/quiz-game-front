import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ScoreBoard from "../components/ScoreBoard/ScoreBoard";
import Button from "../components/Button/Button";
import Select, { Option } from "../components/Select/Select";
import { QuizMode } from "../store/quiz/types";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { setQuizMode } from "../store/quiz/actions";
import quiz from "./Quiz/Quiz";

const ModeOptions = [
  { label: "Лёгкий", value: QuizMode.Easy },
  { label: "Средний", value: QuizMode.Medium },
  { label: "Сложный", value: QuizMode.Hard },
];

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const quizResults = useSelector((state: ApplicationState) => state.quiz.quizResults);

  const mode = useSelector((state: ApplicationState) => state.quiz.quiz.mode);

  const modeOption: Option = useMemo(() => {
    return ModeOptions.find((opt) => opt.value === mode) || ({} as Option);
  }, [mode]);

  const handleModeChange = (newOption: Option) => {
    dispatch(setQuizMode(newOption.value));
  };

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <>
      <Select value={modeOption} onChange={handleModeChange} options={ModeOptions} />
      <ScoreBoard results={quizResults} />
      <Button title={"Перейти к викторине"} onClick={handleStartQuiz} />
    </>
  );
};

export default Home;
