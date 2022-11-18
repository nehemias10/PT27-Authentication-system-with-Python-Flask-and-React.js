import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const FuncionCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_userID");
    localStorage.removeItem("token_userEmail");
    localStorage.removeItem("user");
    navigate("/demo");
    setTimeout(() => {
      location.reload();
    }, 1500);
  };
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.GetValidacion(localStorage.getItem("token"));
  }, []);
  return (
    <nav className="navbar navb " id="navbar">
      <div className="container coco d-flex justify-content-center">
        
      </div>
      {store.login ? (
        <div class="btn-group dropleft">
          <button
            class="btn btn-lg dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-user" id="loginicon"></i>
          </button>
          <div class="dropdown-menu">
            <a onClick={FuncionCerrarSesion} class="dropdown-item">
              Cerrar sesion
            </a>
          </div>
        </div>
      ) : (
        <div className="login-style">
          <Link to="/demo" className="logeate">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};
