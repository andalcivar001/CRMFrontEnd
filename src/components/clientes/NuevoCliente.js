import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
} from "../../services/SweetAlertService";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const NuevoCliente = () => {
  const [auth, guardarAuth] = useContext(CRMContext);
  const navigate = useNavigate();

  const [cliente, guardarCliente] = useState({
    tipoIdent: "",
    identificacion: "",
    nombre: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
  });

  const actualizarState = (e) => {
    guardarCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    guardarCliente((clienteAnterior) => ({
      ...clienteAnterior,
      fechaNacimiento: cliente.fechaNacimiento,
    }));
  }, [cliente.fechaNacimiento]);

  const validarCliente = () => {
    // valido que lso campos tenga datos
    return !Object.values(cliente).every((campo) => campo.length > 0);
  };

  const agregarCliente = (e) => {
    e.preventDefault();
    clienteAxios
      .post(
        "/clientes",

        cliente,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          mostrarAlertaExito(res.data.mensaje);
          navigate("/");
        } else {
          mostrarAlertaError(res.data.mensaje);
        }
      });
  };
  if (!auth.auth && auth.token === localStorage.getItem("token")) {
    navigate("/login");
  }
  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Tipo Ident:</label>
          <input
            type="text"
            placeholder="Tipo Identificacion Cliente"
            name="tipoIdent"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Identificacion:</label>
          <input
            type="text"
            placeholder="Identifcacion Cliente"
            name="identificacion"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Fecha Nacimiento:</label>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            name="fechaNacimiento"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoCliente;
