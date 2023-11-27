import React, { FC } from "react";

import { QuizResult } from "../../store/quiz/types";
import ScoreBoardItem from "./ScoreBoardItem";
import classes from "./ScoreBoard.module.scss";

interface ScoreBoardProps {
  results: QuizResult[];
}

const ScoreBoard: FC<ScoreBoardProps> = ({ results }) => {
  const hasResults = Array.isArray(results) && results.length > 0;
  return (
    <div className={classes.container}>
      <div className={classes.title}>{hasResults ? "Таблица результатов" : "В таблице пока нет результатов..."}</div>
      {hasResults && (
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
