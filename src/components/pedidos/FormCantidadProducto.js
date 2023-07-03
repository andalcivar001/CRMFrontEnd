import React from "react";

const FormCantidadProducto = (props) => {
  const { producto, actualizarCantidad, eliminarProducto } = props;

  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{producto.nombre}</p>
        <p className="precio">${producto.precio}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i
            className="fas fa-minus"
            onClick={() => actualizarCantidad(-1, producto._id)}
          ></i>
          <p>{producto.cantidad}</p>
          <i
            className="fas fa-plus"
            onClick={() => actualizarCantidad(1, producto._id)}
          ></i>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => eliminarProducto(producto._id)}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default FormCantidadProducto;
