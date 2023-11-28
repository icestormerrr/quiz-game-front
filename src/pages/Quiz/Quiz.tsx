import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import clsx from "clsx";

import { QuizResult, TimeByMode } from "../../store/quiz/types";
import { requestQuizQuestions } from "../../store/quiz/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import quizSlice from "../../store/quiz/slice";
import { QUIZ_ADDITIONAL_TIME, QUIZ_QUESTIONS_NUMBER } from "../../config";
import Button from "../../components/Button/Button";
import useTimer from "../../hooks/useTimer";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Quiz.module.scss";

const Quiz: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { questions, mode, loading, error } = useAppSelector((state) => state.quiz);
  const { addQuizResult } = quizSlice.actions;

  const { seconds, change: changeTimer, start: startTimer } = useTimer(TimeByMode[mode]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isAdditionalTimeUsed, setIsAdditionalTimeUsed] = useState(false);

  const handleAnswerClick = (variant: string) => {
    setSelectedAnswer(variant);
  };

  const handleTimeAdd = () => {
    changeTimer(seconds + QUIZ_ADDITIONAL_TIME);
    setIsAdditionalTimeUsed(true);
  };

  const handleCheckAnswer = () => {
    const result = selectedAnswer === questions[currentIndex]?.answer ? 1 : -1;
    setScore((prevScore) => prevScore + result);

    setSelectedAnswer("");
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  };

  const handleSaveResult = () => {
    const lastResult: QuizResult = {
      time: TimeByMode[mode] - seconds + (isAdditionalTimeUsed ? QUIZ_ADDITIONAL_TIME : 0),
      result: score,
      date: Date.now(),
    };
    dispatch(addQuizResult(lastResult));
    navigate("/");
  };

  useEffect(() => {
    dispatch(requestQuizQuestions({ number: QUIZ_QUESTIONS_NUMBER, mode })).then(startTimer);
  }, []);

  useEffect(() => {
    seconds <= 0 && handleSaveResult();
    questions.length > 0 && currentIndex === questions.length && handleSaveResult();
  }, [currentIndex, seconds]);

  useEffect(() => {
    if (error) {
      alert("Произошла ошибка сервера!");
      navigate("/");
    }
  }, [error]);

  return (
    <div className={classes.container}>
      {loading && <Spinner />}
      <div className={classes.info}>
        <p>Время: {seconds}</p>

        <p>Счёт: {score}</p>
      </div>

      <form className={classes.form}>
        <label>{questions[currentIndex]?.question}</label>
        <div className={classes.input}>
          {questions[currentIndex]?.variants.map((variant) => (
            <button
              type="button"
              className={clsx(classes.value, { [classes.active]: selectedAnswer === variant })}
              onClick={() => handleAnswerClick(variant)}
              key={variant}
            >
              {variant}
            </button>
          ))}
        </div>
      </form>

      <div className={classes.buttonGroup}>
        <Button
          type="button"
          disabled={!selectedAnswer}
          className={classes.confirmAnswerButton}
          title={"Подтвердить"}
          hint={"Подтвердить ответ"}
          onClick={handleCheckAnswer}
        />
        {!isAdditionalTimeUsed && (
          <Button title={"+"} hint={"Добавить 10 секунд"} className={classes.addTimeButton} onClick={handleTimeAdd} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
