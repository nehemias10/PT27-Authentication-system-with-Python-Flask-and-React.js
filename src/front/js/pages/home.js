import React, { useContext } from "react";
import { Context } from "../store/appContext";


import { Link } from "react-router-dom";
import "../../styles/home.css";

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div class="row imghome ">
      <Navbar />
      
    </div>
  );
};
