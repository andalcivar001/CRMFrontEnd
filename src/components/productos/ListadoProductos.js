import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto.js";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

const ListadoProductos = () => {
  const navigate = useNavigate();

  const [auth, guardarAuth] = useContext(CRMContext);
  const [productos, guardarProductos] = useState([]);

  const obtenerProductos = async () => {
    const productosConsulta = await clienteAxios.get("/productos", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    guardarProductos(productosConsulta.data);
  };

  useEffect(() => {
    if (auth.token) {
      try {
        obtenerProductos();
      } catch (error) {
        if (error.response.status === 500) {
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  }, [productos]);

  return (
    <Fragment>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      {!productos.length ? (
        <h2>No hay productos</h2>
      ) : (
        <ul className="listado-productos">
          {productos.map((producto) => (
            <Producto key={producto._id} producto={producto} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default ListadoProductos;
