import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from "../../config/axios";
import Cliente from "./cliente";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const [clientes, guardarClientes] = useState([]);
  const navigate = useNavigate();

  const [auth, guardarAuth] = useContext(CRMContext);
  const consultarApi = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    guardarClientes(clientesConsulta.data);
  };

  useEffect(() => {
    if (auth.token !== "") {
      try {
        consultarApi();
      } catch (error) {
        if (error.response.status === 500) {
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  }, [clientes]);

  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      {!clientes.length ? (
        <h2>No hay clientes</h2>
      ) : (
        <ul className="listado-clientes">
          {clientes.map((cliente) => (
            <Cliente key={cliente._id} cliente={cliente} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Clientes;
