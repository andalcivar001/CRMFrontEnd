import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import {
  mostrarAlertaExito,
  mostrarAlertaError,
} from "../../services/SweetAlertService";
import { useNavigate, useParams } from "react-router-dom";

const EditarProducto = () => {
  const { idProducto } = useParams(); // para obtener los parametros de la url
  const navigate = useNavigate();
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  //const { nombre, precio, imagen } = producto;
  const [archivo, guardarArchivo] = useState("");

  const { nombre, precio, imagen } = producto;

  const obtenerProducto = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${idProducto}`);
    guardarProducto(productoConsulta.data);
  };
  const actualizarSteteProducto = (e) => {
    guardarProducto({ ...producto, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    obtenerProducto();
  }, []);

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);
    try {
      const res = await clienteAxios.put(`/productos/${idProducto}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      <h2>Editar Producto</h2>

      <form onSubmit={onSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={actualizarSteteProducto}
            defaultValue={nombre}
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
            defaultValue={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>

          <input
            type="file"
            name="imagen"
            onChange={leerArchivo}
            defaultValue={imagen}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
        {imagen ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`}
            alt="imagen"
          />
        ) : null}
      </form>
    </Fragment>
  );
};

export default EditarProducto;
