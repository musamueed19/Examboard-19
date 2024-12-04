export default function Dropdown({
  label = "",
  onChange = () => {},
  required = true,
  name = "",
  value = "",
  options = [],
  type = "update",
  inline = false,
}) {
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
      {type === "update" ? (
        <select
          value={value}
          name={name}
          id={name}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${
            inline ? "w-2/3" : ""
          } focus:ring-2 focus:ring-blue-200 border-[1.5px] text-black/75 border-gray-300 px-[0.3rem] py-1 rounded-md text-sm outline-none hover:border-gray-400/60`}
        >
          {name !== "status" && <option value="select">Select</option>}
          {Array.isArray(options) &&
            options.map((option, index) => (
              <option
                key={index}
                value={option.id}
                className="text-sm rounded-md"
              >
                {option.name}
              </option>
            ))}
        </select>
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
