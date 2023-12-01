import React, { FC } from "react";
import homeImg from "../../assets/home.png";
import { Outlet, useNavigate } from "react-router-dom";

const HomeNavigate: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <img className="homeButton" src={homeImg} alt="Перейти на домашнюю страницу" onClick={() => navigate("/")} />
      <Outlet />
    </>
  );
};

export default HomeNavigate;
