import React, { Fragment, useState, useContext } from "react";
import clienteAxios from "../../config/axios";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
} from "../../services/SweetAlertService";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const NuevoProducto = () => {
  const navigate = useNavigate();
  const [auth, guardarAuth] = useContext(CRMContext);

  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });
  const [archivo, guardarArchivo] = useState("");

  const actualizarSteteProducto = (e) => {
    guardarProducto({ ...producto, [e.target.name]: e.target.value });
  };
  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const validarDatos = () => {
    // valido que lso campos tenga datos
    return !Object.values(producto).every((campo) => campo.length > 0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);
    try {
      const res = await clienteAxios.post(
        "/productos",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        mostrarAlertaExito(res.data.mensaje);
        navigate("/productos");
      } else {
        mostrarAlertaError(res.data.mensaje);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      mostrarAlertaError("hubo un error al guardar");
    }
  };
  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form onSubmit={onSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={actualizarSteteProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={actualizarSteteProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>

          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
            disabled={validarDatos()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoProducto;
