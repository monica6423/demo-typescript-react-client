import React, {
  useState,
  useContext,
  MouseEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.scss";
import { GlobalContext } from "../../context/GlobalState";
import { FieldConfig2 } from "../fieldConfig/FieldConfig";
import { Select } from "antd";

interface FormProps {
  formType: string | null;
}

const Form = ({ formType }: FormProps) => {
  const { createData, companies, stationTypes } = useContext(GlobalContext);
  const [fieldData, setFieldData] = useState<any>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldData({
      ...fieldData,
      [e.target.name]: e.target.value,
      id: uuidv4(),
    });
    setError({ ...error, [e.target.name]: "" });
  };

  const onSubmitFields = async (e: MouseEvent) => {
    e.preventDefault();
    formType && createData(formType!, fieldData);
    const fieldConstruct = fields.reduce((obj: any, v: any) => {
      obj[v] = "";
      return obj;
    }, {});
    setFieldData(fieldConstruct);
    window.location.reload();
  };

  const fieldObj = formType
    ? FieldConfig2[formType as keyof typeof FieldConfig2]
    : {};
  const fields: { [key: string]: any } = formType
    ? Object.keys(FieldConfig2[formType as keyof typeof FieldConfig2])
    : [];

  useEffect(() => {
    const fieldConstruct = fields.reduce((obj: any, v: any) => {
      obj[v] = "";
      return obj;
    }, {});
    setFieldData(fieldConstruct);
  }, [formType]);

  const handleChange = (value: string, type: string) => {
    console.log("setFieldData");
    setFieldData({
      ...fieldData,
      [type]: value,
      id: uuidv4(),
    });
  };

  const optionArray = (type: string) => {
    if (type === "companies") {
      return companies.map((company: { id: string; name: string }) => ({
        value: company.id,
        label: company.name,
      }));
    }
    if (type === "stationTypes") {
      return stationTypes.map((stationType: { id: string; name: string }) => ({
        value: stationType.id,
        label: stationType.name,
      }));
    }
  };
  return (
    <>
      {formType === "company" && (
        <div style={{ width: "max-content", color: "red" }}>
          If creating a parent company, leave parent company id blank
        </div>
      )}
      <tr>
        {formType
          ? fields.map((field: string, index: number) => {
              const inputField = fieldObj[field as keyof typeof fieldObj] as {
                key: string;
                label: string;
                dropdown: string | null;
              };
              return (
                <td key={index}>
                  {!inputField.dropdown ? (
                    <input
                      type="text"
                      name={inputField.key}
                      value={fieldData[field]}
                      onChange={(e) => onChangeInput(e)}
                      placeholder={inputField.label}
                    ></input>
                  ) : (
                    <div>
                      <Select
                        defaultValue={inputField.key}
                        style={{ width: 120 }}
                        onChange={(value) =>
                          handleChange(value, inputField.key)
                        }
                        options={optionArray(inputField.dropdown)}
                      />
                    </div>
                  )}
                </td>
              );
            })
          : ""}
        <td className="button-cell">
          {formType && (
            <button className="button" onClick={(e) => onSubmitFields(e)}>
              Create
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default Form;
