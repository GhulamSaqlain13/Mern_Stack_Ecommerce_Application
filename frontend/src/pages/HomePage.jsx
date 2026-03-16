import React from "react";
import ProductsPage from "./ProductsPage";
import HeroSection from "../components/HeroSection";
import Category from "../components/Category";
import Arrival from "../components/Arrival";
import CategoryBrowse from "../pages/CategoryBrowse";

import CurrentMonth from "../components/CurrentMonth";
import ShippingPage from "./ShippingPage";
// import HeroSlide from "./components/HeroSlide";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoryBrowse />
      <CurrentMonth />
      <Category />
      <ProductsPage />
      <Arrival />
      <ShippingPage />
    </>
  );
};

export default Home;
