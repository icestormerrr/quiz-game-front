import React, { FC, memo } from "react";

import { QuizResult } from "../../store/quiz/types";
import classes from "./ScoreBoard.module.scss";

type ScoreBoardItemProps = QuizResult;

const ScoreBoardItem: FC<ScoreBoardItemProps> = memo(({ time, result, date }) => {
  return (
    <div className={classes.item}>
      <div className={classes.itemContent}>{result} </div>
      <div className={classes.itemContent}>{time} </div>
      <div className={classes.itemContent}>{date}</div>
    </div>
  );
});

export default ScoreBoardItem;
