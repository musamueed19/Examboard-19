"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CodeVerification = ({ title, onVerify }) => {
  const router = useRouter();
  const [code, setCode] = useState(new Array(4).fill(""));
  const [error, setError] = useState("");

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value)) || element.value === "") return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value !== "" && element.nextElementSibling) {
      element.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const inputElement = e.target;

    if (e.key === "ArrowRight") {
      const nextInput = inputElement.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (e.key === "ArrowLeft") {
      const prevInput = inputElement.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    } else if (e.key === "Delete") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/auth/resetpassword')


    if (code.some((digit) => digit === "")) {
      setError("Please enter all four digits.");
      return;
    }

    setError("");
    alert("Entered Code: " + code.join(""));
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <form
        className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-blue-600 mb-8 text-2xl font-bold">
          {`${title}`} Verification
        </h1>
        <p className="mb-6 text-gray-700">
          Enter the four digit verification code
        </p>
        <div className="flex justify-between mb-8">
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue-600 mx-1"
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          onClick={onVerify}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 w-full text-lg font-semibold"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default CodeVerification;
