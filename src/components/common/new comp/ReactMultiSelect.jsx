'use client'

import { useEffect, useState } from "react";
import Select from "react-select";




const ReactMultiSelect = ({
  label = "",
  onChange = () => {},
  required = true,
  name = "",
  value = [],
  options,
  type = "update",
  inline = false,
}) => {
  
  const [data, setData] = useState([]);
  
  function onSelect(result) {
    console.log(options);
    console.log('---- ReactMultiSelect ----', result);
    onChange(name, result);
    console.log(`Current DropDown --- ${result.label} & Stored Roles Bank, is updated or not ${value}`);
    setData(
      result.map((item) => {
        return item.value;
      })
    );
  }
  
  // function onRemove(result) {
  //   setData(
  //     result.map((item) => {
  //       return item.id;
  //     })
  //   );
  // }
  
  useEffect(() => {
    // onChange(name, data);
    // console.log(data);
  }, [data]);
  return (
    <div
      className={`flex w-full text-sm ${
        inline === false ? "flex-col" : "flex-row gap-4 items-center"
      }`}
    >
      <label
        htmlFor={name}
        className={`${inline ? "w-1/3" : ""} font-medium text-black/85`}
      >
        {label}{" "}
        {required && type !== "view" && <span className="text-red-500">*</span>}
      </label>

      {/* Dropdwon or Label - based on the type == view or update */}
      {type === "update" ? (
        <Select
          value={value}
          options={options}
          // selectedValues={options.filter((option) => value.includes(option.id))} // Preselect values
          isMulti={true}
          displayValue="name"
          onChange={onSelect}
        />
      ) : (
        type === "view" && (
          <label
            className={`${inline ? "w-2/3" : ""} text-sm text-black/75`}
            name={name}
            id={name}
          >
            {value}
          </label>
        )
      )}
    </div>
  );
};

export default ReactMultiSelect;
