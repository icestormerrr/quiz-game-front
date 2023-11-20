import React, { FC } from "react";

import { QuizResult } from "../../store/quiz/types";
import ScoreBoardItem from "./ScoreBoardItem";
import classes from "./ScoreBoard.module.scss";

interface ScoreBoardProps {
  results: QuizResult[];
}

const ScoreBoard: FC<ScoreBoardProps> = ({ results }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {results?.length ? "Таблица результатов" : "В таблице пока нет результатов..."}
      </div>
      {!!results?.length && (
        <div className={classes.table}>
          <div className={classes.item}>
            <div className={classes.itemContent}>Счёт</div>
            <div className={classes.itemContent}>Время</div>
            <div className={classes.itemContent}>Дата</div>
          </div>
          {results.map((result) => (
            <ScoreBoardItem key={result.date} time={result.time} result={result.result} date={result.date} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
