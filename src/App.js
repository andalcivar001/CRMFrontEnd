import React, { Fragment, useContext, useState } from "react";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

import ListadoProductos from "./components/productos/ListadoProductos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";

import Login from "./components/auth/login";

import { CRMContext, CRMProvider } from "./context/CRMContext";

const App = () => {
  // utilizar context en el componente
  const [auth, guardarAuth] = useContext(CRMContext);
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/" element={<Clientes />} />
                <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                <Route
                  path="/clientes/editar/:idCliente"
                  element={<EditarCliente />}
                />

                <Route path="/productos" element={<ListadoProductos />} />
                <Route path="/productos/nuevo" element={<NuevoProducto />} />

                <Route
                  path="/productos/editar/:idProducto"
                  element={<EditarProducto />}
                />

                <Route path="/pedidos" element={<Pedidos />} />
                <Route
                  path="/pedidos/nuevo/:idCliente"
                  element={<NuevoPedido />}
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
};

export default App;
