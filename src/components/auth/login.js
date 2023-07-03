import React, { useContext, useState } from "react";
import clienteAxios from "../../config/axios";
import { mostrarAlertaError } from "../../services/SweetAlertService";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Login = () => {
  const [auth, guardarAuth] = useContext(CRMContext);
  const navigate = useNavigate();
  const [credenciales, guardarCredenciales] = useState({
    email: "",
    password: "",
  });

  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const res = await clienteAxios.post("/usuarios/login", credenciales);
      const { token } = res.data;
      localStorage.setItem("token", token);
      guardarAuth({
        token: token,
        auth: true,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response) {
        mostrarAlertaError(error.response.data.mensaje);
      } else {
        mostrarAlertaError("Error de CORS");
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese email"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese password"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="btn btn-verde btn-block"
          />
        </form>
        <p>Acceso email:correo@correo.com pwd:123456</p>
      </div>
    </div>
  );
};

export default Login;
