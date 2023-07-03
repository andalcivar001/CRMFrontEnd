import Swal from "sweetalert2";

export const mostrarAlertaExito = (mensaje) => {
  Swal.fire({
    title: "Exito",
    text: mensaje,
    icon: "success",
  });
};

export const mostrarAlertaError = (mensaje) => {
  Swal.fire({
    title: "Error",
    text: mensaje,
    icon: "error",
  });
};

export const mostrarAlertaConfirmacion = (mensaje, onConfirm) => {
  Swal.fire({
    title: "Confirmar",
    text: mensaje,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
