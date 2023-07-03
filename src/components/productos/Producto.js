import React from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
  mostrarAlertaConfirmacion,
} from "../../services/SweetAlertService";
const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;

  const eliminarProducto = (idProducto) => {
    mostrarAlertaConfirmacion("¿Estás seguro que deseas eliminar?", () => {
      clienteAxios.delete(`/productos/${idProducto}`).then((res) => {
        if (res.status === 200) {
          mostrarAlertaExito("Producto eliminado OK");
        } else {
          mostrarAlertaError(res.data.mensaje);
        }
      });
    });
  };
  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio} </p>
        {imagen ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`}
            alt="imagen"
          />
        ) : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          onClick={() => eliminarProducto(_id)}
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

export default Producto;
