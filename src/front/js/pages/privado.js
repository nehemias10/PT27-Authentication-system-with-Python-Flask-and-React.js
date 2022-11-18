import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbarl } from "../component/navbarl";

export const Privado = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <Navbarl />
      Iniciaste sesión, esta paágina es privada.
    </div>
  );
};
