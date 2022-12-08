import React, { useState } from "react";
import "./CreateNew.scss";

interface setState {
  setFormType: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateNew = ({ setFormType }: setState) => {
  const [open, setOpen] = useState<boolean>(false);
  const renderForm = (type: string) => {
    console.log("type", type);
    setFormType(type);
  };

  return (
    <div>
      <td className="button-cell ">
        <button className="button main" onClick={(e) => setOpen(!open)}>
          Create new
        </button>
      </td>
      {open && (
        <div className="flex button-cell">
          <button className="button " onClick={(e) => renderForm("station")}>
            Station
          </button>
          <button
            className="button "
            onClick={(e) => renderForm("stationType")}
          >
            Station Type
          </button>
          <button className="button " onClick={(e) => renderForm("company")}>
            Company
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateNew;
