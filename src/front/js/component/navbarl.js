import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";



export const Navbarl = () => {
  const navigate = useNavigate();
  const FuncionCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_userID");
    localStorage.removeItem("token_userEmail");
    localStorage.removeItem("user");
    navigate("/demo");
    setTimeout(() => {
      location.reload();
    }, 1);
  };
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.GetValidacion(localStorage.getItem("token"));
  }, []);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
       
        <div className="ml-auto">
          
        </div>
        {store.demo ? (
          
              <button type="submit" class="btn btn-primary rounded m-4" onClick={FuncionCerrarSesion} >
                Cerrar sesion
              </button>
            
        ) : (
          <div className="login-style">
           
          </div>
        )}
      </div>
    </nav>
  );
};
