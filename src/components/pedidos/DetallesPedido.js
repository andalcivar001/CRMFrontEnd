import React from "react";

const Detallespedidos = (props) => {
  const { pedido } = props;
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
        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
};

export default Detallespedidos;
