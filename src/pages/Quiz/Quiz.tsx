import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";

import { QuizResult, TimeByMode } from "../../store/quiz/types";
import { ApplicationState } from "../../store";
import { addQuizResult, requestQuizQuestions, setQuizLastResult } from "../../store/quiz/actions";
import parseDate from "../../infrastructure/utils/parseDate";
import Button from "../../components/Button/Button";
import useTimer from "../../hooks/useTimer";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./Quiz.module.scss";

const Quiz: FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const mode = useSelector((state: ApplicationState) => state.quiz.quiz.mode);
  const questions = useSelector((state: ApplicationState) => state.quiz.quiz.questions);

  const { seconds, change: changeTimer } = useTimer(TimeByMode[mode], true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdditionalTimeUsed, setIsAdditionalTimeUsed] = useState(false);

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, variant: string) => {
    event.preventDefault();
    setSelectedAnswer(variant);
  };

  const handleTimeAdd = () => {
    changeTimer(seconds + 10);
    setIsAdditionalTimeUsed(true);
  };

  const handleCheckAnswer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const result = selectedAnswer === questions[currentIndex]?.answer ? 1 : -1;
    setScore((prevScore) => prevScore + result);

    if (currentIndex === questions.length - 1) {
      fetchQuestions(5);
      return;
    }
    setSelectedAnswer("");
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  };

  const handleSaveResult = () => {
    const lastResult: QuizResult = {
      time: TimeByMode[mode],
      result: score,
      date: parseDate(Date.now()),
    };
    dispatch(setQuizLastResult(lastResult));
    dispatch(addQuizResult(lastResult));
    navigate("/");
  };

  async function fetchQuestions(number: number) {
    setIsLoading(true);
    await dispatch(requestQuizQuestions(number, mode));
    setIsLoading(false);
  }

  useEffect(() => {
    fetchQuestions(10);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      handleSaveResult();
    }
  }, [seconds]);

  return (
    <div className={classes.container}>
      {isLoading && <Spinner />}
      <div className={classes.info}>
        <p>Время: {seconds}</p>

        <p>Счёт: {score}</p>
      </div>

      <form className={classes.form}>
        <label>{questions[currentIndex]?.question}</label>
        <div className={classes.input}>
          {questions[currentIndex]?.variants.map((variant) => (
            <button
              className={clsx(classes.value, selectedAnswer === variant && classes.active)}
              onClick={(event) => handleAnswerClick(event, variant)}
              key={variant}
            >
              {variant}
            </button>
          ))}
        </div>
      </form>

      <div className={classes.buttonGroup}>
        <Button title={"Подтвердить"} onClick={handleCheckAnswer} style={{ minWidth: 400 }} />
        {!isAdditionalTimeUsed && <Button title={"+"} className={classes.addTimeButton} onClick={handleTimeAdd} />}
      </div>
    </div>
  );
};

export default Quiz;
