import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
  mostrarAlertaConfirmacion,
} from "../../services/SweetAlertService";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const Cliente = ({ cliente }) => {
  const { _id, nombre, telefono, tipoIdent, identificacion, email } = cliente;
  const [auth, guardarAuth] = useContext(CRMContext);
  const eliminarCliente = (idCliente) => {
    mostrarAlertaConfirmacion(
      "¿Estás seguro que deseas cancelar?",
      async () => {
        try {
          const response = await clienteAxios.delete(`/clientes/${idCliente}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          if (response.status === 200) {
            mostrarAlertaExito("Cliente eliminado OK");
          } else {
            mostrarAlertaError(response.data.mensaje);
          }
        } catch (error) {
          mostrarAlertaError("Ocurrió un error al eliminar el cliente");
        }
      }
    );
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {tipoIdent === "C"
            ? "Cedula"
            : tipoIdent === "R"
            ? "RUC"
            : "Pasaporte"}
        </p>
        <p className="nombre">{identificacion}</p>
        <p className="nombre">{nombre}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          onClick={() => eliminarCliente(_id)}
          type="button"
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Cliente;
