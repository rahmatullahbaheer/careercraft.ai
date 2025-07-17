import { toast } from "react-toastify";

const showSuccessToast = (message: string) => {
  toast.dismiss();
  toast.success(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const showInfoToast = (message: string) => {
  toast.dismiss();
  toast.info(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const showWarningToast = (message: string) => {
  toast.dismiss();
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

const showErrorToast = (message: string = "Some error occured.") => {
  toast.dismiss();
  toast.error(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export { showInfoToast, showWarningToast, showErrorToast, showSuccessToast };
