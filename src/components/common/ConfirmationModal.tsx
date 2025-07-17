import React, { useEffect } from "react";
import Swal from "sweetalert2";
type ConfirmationModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  upgrade?: boolean;
};

const DeleteConfirmationModal = ({
  message,
  upgrade,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    Swal.fire({
      title: upgrade ? "Upgrade Your Package" : "Are you sure?",
      text: message,
      icon: "warning",
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: upgrade ? "Yes Upgrade It!" : "Yes Delete It?",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Check if the modal was dismissed by cancel action
        if (onCancel) {
          onCancel(); // Call onCancel callback
        }
      }
    });
  };
  useEffect(() => {
    handleConfirm();
  }, []);

  return <></>;
};

export default DeleteConfirmationModal;
