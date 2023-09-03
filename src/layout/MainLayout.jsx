import React from "react";
import { Header } from "../components/layout/header/Header";

export const MainLayout = (props) => {
  return (
    <>
      <Header />
      <main>
        {props.children}
      </main>
    </>
  );
};
