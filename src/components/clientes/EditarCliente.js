import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
} from "../../services/SweetAlertService";
import { useNavigate, useParams } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const EditarCliente = () => {
  const { idCliente } = useParams(); // para obtener los parametros de la url
  const [auth, guardarAuth] = useContext(CRMContext);

  const navigate = useNavigate();

  const [cliente, datosCliente] = useState({
    tipoIdent: "",
    identificacion: "",
    nombre: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
  });

  const [fechaFormateada, setFechaFormateada] = useState("");

  const obtenerCliente = async () => {
    const cliente = await clienteAxios.get(`/clientes/${idCliente}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (!cliente.data) {
      mostrarAlertaError("No se pudo obtener los datos del cliente");
      return;
    }
    datosCliente(cliente.data);
    setFechaFormateada(
      new Date(cliente.data.fechaNacimiento).toISOString().split("T")[0]
    );
  };

  const actualizarState = (e) => {
    datosCliente({ ...cliente, [e.target.name]: e.target.value });
    console.log([e.target.name] + ": " + e.target.value);
  };

  useEffect(() => {
    if (cliente.fechaNacimiento) {
      datosCliente((clienteAnterior) => ({
        ...clienteAnterior,
        fechaNacimiento: cliente.fechaNacimiento,
      }));
    }
    obtenerCliente();
  }, [cliente.fechaNacimiento]);

  const validarCliente = () => {
    // valido que lso campos tenga datos
    return !Object.values(cliente).every((campo) => campo.length > 0);
  };

  const actualizarCliente = (e) => {
    e.preventDefault();

    clienteAxios.put(`/clientes/${idCliente}`, cliente).then((res) => {
      if (res.status === 200) {
        mostrarAlertaExito("Cliente actulizado OK");
        navigate("/");
      } else {
        mostrarAlertaError(res.data.mensaje);
      }
    });
  };
  return (
    <Fragment>
      <h2>Editando Cliente - {cliente.nombre} </h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Tipo Ident:</label>
          <input
            type="text"
            placeholder="Tipo Identificacion Cliente"
            name="tipoIdent"
            value={cliente.tipoIdent}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Identificacion:</label>
          <input
            type="text"
            placeholder="Identifcacion Cliente"
            name="identificacion"
            value={cliente.identificacion}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={cliente.nombre}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            value={cliente.telefono}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            value={cliente.email}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Fecha Nacimiento:</label>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            name="fechaNacimiento"
            value={fechaFormateada}
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default EditarCliente;
