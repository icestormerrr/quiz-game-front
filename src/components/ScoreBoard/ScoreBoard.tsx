import React, { FC } from "react";

import clsx from "clsx";

import { QuizResult } from "../../store/results/types";
import ScoreBoardItem from "./ScoreBoardItem";
import classes from "./ScoreBoard.module.scss";
import Spinner from "../Spinner/Spinner";

interface ScoreBoardProps {
  results: QuizResult[];
  isLoading?: boolean;
}

const ScoreBoard: FC<ScoreBoardProps> = ({ results, isLoading }) => {
  const hasResults = Array.isArray(results) && results.length > 0;
  return (
    <div className={classes.container}>
      {isLoading && <Spinner />}
      <div className={classes.header}>
        <div className={classes.title}>{hasResults ? "Таблица результатов" : "В таблице пока нет результатов..."}</div>
        {hasResults && <div className={classes.tinyTitle}>(можно скролить)</div>}
      </div>

      {hasResults && (
        <>
          <div className={clsx(classes.item, classes.headerItem)}>
            <div className={classes.itemContent}>Счёт</div>
            <div className={classes.itemContent}>Время</div>
            <div className={classes.itemContent}>Дата</div>
          </div>
          <div className={classes.table}>
            {results.map((result) => (
              <ScoreBoardItem key={result._id} time={result.time} result={result.result} date={result.date} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreBoard;
