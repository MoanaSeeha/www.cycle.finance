
import React from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import "./App.css";
import Footer from "./pages/layout/footer";
import Header from "./pages/layout/header";
import Router from "./router";

const App = () => {
  return (
    <div className="relative w-full">
      <Header />
      <ParallaxProvider>
        <Router />
      </ParallaxProvider>
      <Footer />
    </div>
  );
};

export default App;
