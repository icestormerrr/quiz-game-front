import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";

import { QuizResult, TimeByMode } from "../../store/quiz/types";
import { ApplicationState } from "../../store";
import { addQuizResult, requestQuizQuestions } from "../../store/quiz/actions";
import { QUIZ_ADDITIONAL_TIME, QUIZ_QUESTIONS_NUMBER } from "../../config";
import Button from "../../components/Button/Button";
import useTimer from "../../hooks/useTimer";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Quiz.module.scss";

const Quiz: FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const mode = useSelector((state: ApplicationState) => state.quiz.mode);
  const questions = useSelector((state: ApplicationState) => state.quiz.questions);

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
    changeTimer(seconds + QUIZ_ADDITIONAL_TIME);
    setIsAdditionalTimeUsed(true);
  };

  const handleCheckAnswer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

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
    async function fetchQuestions(number: number) {
      setIsLoading(true);
      const { errors } = await dispatch(requestQuizQuestions(number, mode));
      if (errors) {
        alert("Произошла ошибка сервера!");
        navigate("/");
      }
      setIsLoading(false);
    }
    fetchQuestions(QUIZ_QUESTIONS_NUMBER);
  }, []);

  useEffect(() => {
    seconds <= 0 && handleSaveResult();
  }, [seconds]);

  useEffect(() => {
    currentIndex === questions.length && handleSaveResult();
  }, [currentIndex]);

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
        <Button
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
