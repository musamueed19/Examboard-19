"use client";

import { forgotPassword } from "@/lib/Fetcher/getAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [disbaled, setDisabled] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "" || value === null) {
      setError(`email is required`);
    }
    // else if (!emailRegex.test(formData.email)) {
    //   setError("Invalid email!");
    // }
    else {
      setError("");
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email!");
      return;
    }
    if (error !== "" && error !== null) return;
     setEmailError("");
    setError("");

    const res = await forgotPassword(formData.email);
    console.log(res);
    if (!res.success) {
      setError(res.error);
      return;
    }

    setSuccess(res.data);
    // setSuccess("Success: " + formData.email);

    console.log(formData);
    setDisabled(true)
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-10">
        <div className="space-y-2">
          {error && <p className="bg-[#faeae8] text-[#640d06] py-2.5 px-4 rounded-md mb-4 flex items-center gap-2">
            <Image src="/alert.svg" alt="error icon" width={20} height={20} /> {error}
          </p>}
          {success && (
            <p className="bg-green-400 py-2.5 px-4 rounded-md mb-4 text-white font-medium flex items-center gap-2">
              <Image src="/successfull.svg" alt="error icon" width={24} height={24} /> {success}
            </p>
          )}
        <div className="flex flex-col">
          <label className="font-medium text-lg text-[#344054]" htmlFor="email">
            Email
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="outline-none border-2 focus:ring-2 focus:ring-blue-200 rounded-md py-1 px-3"
            value={formData.email}
            tabIndex="1"
          />
         {emailError && <p className="text-red-500 text-sm lowercase">{emailError}</p>}
          </div>
          </div>

        <button
          type="submit"
          className="bg-[#226ffe] text-white w-full py-1 font-medium rounded-lg hover:bg-[#324cf3] text-lg"
          disabled={disbaled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
