import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
} from "../../services/SweetAlertService";
import { CRMContext } from "../../context/CRMContext";

import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
const NuevoPedido = () => {
  const [auth, guardarAuth] = useContext(CRMContext);

  const { idCliente } = useParams(); // para obtener los parametros de la url
  const navigate = useNavigate();

  const [cliente, datosCliente] = useState({});
  const [busqueda, guardarBusqeuda] = useState("");
  const [productos, guardarProducto] = useState([]);
  const [total, guardarTotal] = useState(0);

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
  };

  useEffect(() => {
    obtenerCliente();
    actualizarTotal();
  }, [productos]);

  const buscarProducto = async (e) => {
    e.preventDefault();
    try {
      const resultado = await clienteAxios.get(
        `/productos/busqueda/${busqueda}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (resultado.data && resultado.data.length) {
        let productosExiste = [...productos];
        if (productos.length) {
          productosExiste = productos.map((producto) => {
            if (producto.cantidad > 0) {
              return producto;
            }
          });
        }
        const productoCantidad = resultado.data.map((producto) => {
          producto.cantidad = 0;
          producto.producto = producto._id;
          return producto;
        });
        guardarProducto(productoCantidad);
      } else {
        mostrarAlertaError("No hay resultados");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const leerDatosBusqueda = (e) => {
    guardarBusqeuda(e.target.value);
  };

  const actualizarCantidad = (signo, _id) => {
    const todosProductos = [...productos];
    const index = todosProductos.findIndex((x) => x._id == _id);
    if (index != -1) {
      if (signo == -1) {
        if (todosProductos[index].cantidad == 0) {
          return;
        } else {
          todosProductos[index].cantidad--;
        }
      } else {
        todosProductos[index].cantidad++;
      }
      guardarProducto(todosProductos);
    }
  };

  const actualizarTotal = () => {
    let totalPedido = 0;
    productos.map((producto) => {
      totalPedido += producto.cantidad * producto.precio;
    });
    guardarTotal(totalPedido);
  };
  const eliminarProducto = (id) => {
    const productosExisten = productos.filter((x) => x._id !== id);
    guardarProducto(productosExisten);
  };

  const realizarPedido = async (e) => {
    e.preventDefault();
    const pedido = {
      cliente: cliente._id,
      pedido: productos,
      total: total,
    };
    try {
      const res = await clienteAxios.post(`/pedidos`, pedido, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.status === 200) {
        mostrarAlertaExito(res.data.mensaje);
        navigate("/");
      } else {
        mostrarAlertaError(res.data.mensaje);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre}</p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto._id}
            producto={producto}
            actualizarCantidad={actualizarCantidad}
            total={total}
            eliminarProducto={eliminarProducto}
          />
        ))}
      </ul>
      <p className="total">
        Total a pagar: <span>$ {total}</span>{" "}
      </p>
      <div className="enviar">
        {total > 0 ? (
          <form onSubmit={realizarPedido}>
            <input
              type="submit"
              className="btn btn-verde btn-block"
              value="Realizar Pedido"
            />
          </form>
        ) : null}
      </div>
    </Fragment>
  );
};

export default NuevoPedido;
