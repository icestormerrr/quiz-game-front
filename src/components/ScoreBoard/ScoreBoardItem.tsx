import React, { FC, memo } from "react";

import { QuizResult } from "../../store/results/types";
import formatDate from "../../utils/formatDate";
import classes from "./ScoreBoard.module.scss";

interface ScoreBoardItemProps extends Omit<QuizResult, "_id"> {}

const ScoreBoardItem: FC<ScoreBoardItemProps> = memo(({ time, result, date }) => {
  return (
    <div className={classes.item}>
      <div className={classes.itemContent}>{result} </div>
      <div className={classes.itemContent}>{time} </div>
      <div className={classes.itemContent}>{formatDate(date)}</div>
    </div>
  );
});

export default ScoreBoardItem;
