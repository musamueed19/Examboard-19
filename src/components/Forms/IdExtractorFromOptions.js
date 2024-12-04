export default function setId(value, setId, options) {
  const selectedDesignation = options.find(
    (option) => option.value === value
  );

  if (selectedDesignation) {
    setId(selectedDesignation.id);
  }
}