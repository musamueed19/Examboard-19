import { Multiselect } from "multiselect-react-dropdown";
import { useEffect, useState } from "react";

export default function MultiSelectdropdwon({
  label = "",
  onChange = () => {},
  required = true,
  name = "",
  value = [],
  options,
  type = "update",
  inline = false,
}) {

  const [data, setData] = useState([]);

  function onSelect(result) {
    setData(result.map(item => {
      return item.id;
    }))
  }

  function onRemove(result) {
    setData(result.map(item => {
      return item.id;
    }))
  }

  useEffect(() => {

    onChange(name, data);
    console.log(data);
    console.log(data);
  }, [data])

  return (
    <div
      className={`flex w-full ${
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
        <Multiselect
          value={value}
          options={options}
          selectedValues={options.filter((option) => value.includes(option.id))} // Preselect values
          displayValue="name"
          onSelect={onSelect}
          onRemove={onRemove}
          showArrow
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
}
