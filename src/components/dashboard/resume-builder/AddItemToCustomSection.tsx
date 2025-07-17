import React, { useState } from "react";
import CustomForm from "./CustomForm";
type Props = {
  recName: any;
  isSidebar?: boolean;
};
const AddItemToCustomSection = ({ recName, isSidebar }: Props) => {
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setShowCustomForm(!showCustomForm);
        }}
        className="text-sm text-gray-900 cursor-pointer hover:opacity-80 font-semibold bg-gray-200 py-2 rounded-lg px-3 m-2   "
      >
        Add Item
      </button>
      {showCustomForm && (
        <CustomForm setShowCustomForm={setShowCustomForm} recName={recName} />
      )}
    </>
  );
};

export default AddItemToCustomSection;
