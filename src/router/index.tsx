import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Howl from "../pages/howl";
import LpHunt from '../pages/lphunt';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/lphunt" />} />
      <Route path="/lphunt" element={<LpHunt />} />
      <Route path="/howl" element={<Howl />} />
    </Routes>
  );
};

export default Router;
