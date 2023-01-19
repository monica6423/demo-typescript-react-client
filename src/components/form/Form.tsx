import {
  useState,
  useContext,
  MouseEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { Restaurant, RestaurantType, Company } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import "./Form.scss";
import { GlobalContext } from "../../context/GlobalState";
import { FieldConfig2 } from "../fieldConfig/FieldConfig";
import { Select, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
interface FormProps {
  formType: string | null;
}

interface InputField {
  key: string;
  label: string;
  dropdown: string | null;
  checkbox: string | null;
}

const cleanFieldData = (fields: string[]) => {
  return fields.reduce((obj: any, v: any) => {
    obj[v] = "";
    return obj;
  }, {});
};

const Form = ({ formType }: FormProps) => {
  const { createData, companies, restaurantTypes } = useContext(GlobalContext);
  const [fieldData, setFieldData] = useState<
    Restaurant | RestaurantType | Company
  >({} as Restaurant | RestaurantType | Company);
  const [fieldConfig, setFieldConfig] = useState({});
  const [fieldKey, setFieldKey] = useState<string[]>([]);

  useEffect(() => {
    const fieldObj = formType
      ? FieldConfig2[formType as keyof typeof FieldConfig2]
      : {};
    const fields: string[] = formType
      ? Object.keys(FieldConfig2[formType as keyof typeof FieldConfig2])
      : [];
    setFieldConfig(fieldObj);
    setFieldKey(fields);
    setFieldData(cleanFieldData(fields));
  }, [formType]);

  const handleChange = (
    e: RadioChangeEvent | ChangeEvent<HTMLInputElement>
  ) => {
    e.target.name &&
      setFieldData({
        ...fieldData,
        [e.target.name]: e.target.value,
        id: uuidv4(),
      });
  };

  const handleSelect = (value: string, type: string) => {
    setFieldData({
      ...fieldData,
      [type]: value,
      id: uuidv4(),
    });
  };

  const optionArray = (type: string) => {
    const mapToOption = (array: { id: string; name: string }[]) =>
      array.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    if (type === "companies") {
      return mapToOption(companies);
    }
    if (type === "restaurantTypes") {
      return mapToOption(restaurantTypes);
    }
    return [];
  };

  const renderInputField = (
    inputField: InputField,
    fieldData: any,
    field: string
  ) => {
    if (inputField.dropdown) {
      return (
        <div>
          <Select
            defaultValue={inputField.key}
            style={{ width: 180 }}
            onChange={(value) => handleSelect(value, inputField.key)}
            options={optionArray(inputField.dropdown)}
          />
        </div>
      );
    }
    if (inputField.checkbox) {
      return (
        <Radio.Group
          onChange={handleChange}
          value={fieldData.status}
          name={inputField.key}
        >
          <Radio value={"Available"}>Available</Radio>
          <Radio value={"TemporaryClose"}>TemporaryClose</Radio>
        </Radio.Group>
      );
    }
    return (
      <input
        type="text"
        name={inputField.key}
        value={fieldData[field]}
        onChange={(e) => handleChange(e)}
        placeholder={inputField.label}
      ></input>
    );
  };

  const onSubmitFields = async (e: MouseEvent) => {
    e.preventDefault();
    formType && createData(formType!, fieldData);
    setFieldData(cleanFieldData(fieldKey));
  };

  return (
    <>
      <tr>
        {formType &&
          fieldKey.map((field: string, index: number) => {
            const inputField = fieldConfig[
              field as keyof typeof fieldConfig
            ] as InputField;
            return (
              <td key={index}>
                {renderInputField(inputField, fieldData, field)}
              </td>
            );
          })}
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
