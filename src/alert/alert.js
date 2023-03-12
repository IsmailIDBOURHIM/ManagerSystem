import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export function useSwalSuccess(message, iconType) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: iconType,
    title: message,
  });
}

export function useSwalError(message) {
  Swal.fire({
    icon: "error",
    title: message,
    timer: 5000,
    position: "center",
    Animation: false,
  });
}

export function useSwalToConfirmDeletion(message, callback) {
  Swal.fire({
    title: message,
    icon: "warning",
    buttonsStyling: true,
    showDenyButton: true,
    confirmButtonText: "delete",
    denyButtonText: `Cancel`,
    customClass: {
      confirmButton: "btn btn-primary",
      denyButton: "btn btn-danger",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    } else if (result.isDenied) {
      Swal.close();
    }
  });
}
