import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Detallespedidos from "./DetallesPedido";
const Pedidos = () => {
  const [pedidos, guardarPedidos] = useState([]);

  const consultarApi = async () => {
    const res = await clienteAxios.get(`/pedidos`);
    guardarPedidos(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    consultarApi();
  }, []);
  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <Detallespedidos key={pedido._id} pedido={pedido} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Pedidos;
