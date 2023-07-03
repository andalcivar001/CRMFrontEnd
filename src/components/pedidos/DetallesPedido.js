import React, { useContext } from "react";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
  mostrarAlertaConfirmacion,
} from "../../services/SweetAlertService";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const Detallespedidos = (props) => {
  const { pedido } = props;
  const [auth, guardarAuth] = useContext(CRMContext);

  const eliminarPedido = (idPedido) => {
    mostrarAlertaConfirmacion(
      "¿Estás seguro que deseas eliminar?",
      async () => {
        try {
          const response = await clienteAxios.delete(`/pedidos/${idPedido}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          if (response.status === 200) {
            mostrarAlertaExito("Pedido eliminado OK");
          } else {
            mostrarAlertaError(response.data.mensaje);
          }
        } catch (error) {
          mostrarAlertaError("Ocurrió un error al eliminar el Pedido");
        }
      }
    );
  };

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {pedido.cliente._id}</p>
        <p className="nombre">Cliente: {pedido.cliente.nombre}</p>
        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {pedido.pedido.map((articulo) => (
              <li key={articulo.producto._id}>
                <p>{articulo.producto.nombre}</p>
                <p>Precio: $ {articulo.producto.precio}</p>
                <p>Cantidad: {articulo.cantidad}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="total">Total : $ {pedido.total} </p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarPedido(pedido._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
};

export default Detallespedidos;
