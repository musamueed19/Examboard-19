export default function InputFields({

  congest = false,
  label,
  onChange = "",
  required = true,
  name = "",
  input = "text",
  value = "",
  placeholder,
  options,
  type = "update",
  inline = false,
  onBlur,
}) {
  return (
    <div className="w-full">
      {input !== "dropdown" ? (
        <div
          className={`flex ${
            inline === false ? "flex-col" : "flex-row gap-4 items-center"
          }`}
        >
          <label
            htmlFor={name}
            className={`font-medium text-black/85 ${inline ? "w-1/3" : ""}`}
          >
            {label}{" "}
            {required && type !== "view" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          {type === "update" ? (
            <input
              className={`${
                inline ? "w-2/3" : ""
              } border-[1.5px] text-black/75 border-gray-300 px-[0.3rem] py-[0.4rem] rounded-md text-sm outline-none hover:border-gray-400/60 focus:ring-2 focus:ring-blue-200 ${
                input === "date" ? "cursor-pointer" : ""
              }`}
              type={input}
              name={name}
              id={name}
              key={name}
              placeholder={placeholder}
              value={value}
              onChange={(event) => {
                onChange(name, event.target.value, event.target.files)
                // onChange(name, name === "courseFile" ? event.target.files : event.target.value); 
                // console.log(event);
              }}
              validate="true"
              onBlur={onBlur}
            />
          ) : (
            type === "view" && (
              <label
                className={`${inline && congest ? "w-1/3" : ""} ${
                  !congest && inline ? "w-2/3" : ""
                } pt-1 text-black/75 text-sm`}
                name={name}
                id={name}
              >
                {value}
              </label>
            )
          )}
        </div>
      ) : (
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
            {required && type !== "view" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          {type === "update" ? (
            <select
              value={value}
              name={name}
              id={name}
              key={name}
              onChange={(event) => onChange(name, event.target.value)}
              className={`${inline && congest ? "w-1/3" : ""} ${
                !congest && inline ? "w-2/3" : ""
              } border-[1.5px] text-black/75 border-gray-300 px-[0.3rem] py-1 rounded-md text-sm outline-none hover:border-gray-400/60`}
            >
              {!value && <option value="select">Select</option>}
              console.log(options);
              {options.map((option, index) => (
                <option
                  name={option.value}
                  value={option.id}
                  key={index}
                  className="text-sm rounded-md"
                >
                  {option.value}
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
      )}
    </div>
  );
}
