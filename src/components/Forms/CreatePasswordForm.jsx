"use client";

import { setPassword } from "@/lib/Fetcher/getAuth";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatePasswordForm() {

const params = useParams(); // This hook will give you the parameters
const [userId, setUserId] = useState(null);

useEffect(() => {
  if (params && params.id) {
    setUserId(params.id);
    console.log(params.id);
  }
}, [params]);


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "password" && (value === "" || value === null)) {
      setPasswordError(`password is required`);
    } else if (name === "password" && !passwordRegex.test(value)) {
      setPasswordError(
        `password must be atleast 8 characters long (must have one special, lowercase, uppercase)`
      );
    } else if (name === "confirmPassword" && (value === "" || value === null)) {
      setConfirmPasswordError(`confirm password is required`);
    } else if (name === "confirmPassword" && !passwordRegex.test(value)) {
      setConfirmPasswordError(
        `password must be atleast 8 characters long (must have one special, lowercase, uppercase)`
      );
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError("");

    if (
      passwordError !== "" &&
      passwordError !== null &&
      confirmPasswordError !== "" &&
      confirmPasswordError !== null
    )
      return;
    else if (formData.password !== formData.confirmPassword) {
      setError("Unmatched passwords");
      return;
    }

    console.log(formData.password);

    const res = await setPassword(userId, formData.password);
    console.log(res);
    if (!res.success) {
      setError(res.error);
      setFormData({
        password: "",
        confirmPassword: ""
      });
      return;
    }
    // console.log(res.data);

    setSuccess(res.data);

    // setFormData({
    //   password: "",
    //   confirmPassword: "",
    // });

    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-14">
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
            <label
              className="font-medium text-lg text-[#344054]"
              htmlFor="password"
            >
              Password
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="group border-2 flex px-2 rounded-md focus-within:ring-2 focus-within:ring-blue-200">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                placeholder="Enter new password"
                required
                className="group outline-none py-1 w-full"
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((curr) => !curr)}
              >
                <Image
                  src={isPasswordVisible ? "/eyeOpen.svg" : "/eyeClose.svg"}
                  alt="hidePassword icon"
                  width={16}
                  height={16}
                  className="cursor-pointer transition-all"
                  key={isPasswordVisible ? "eyeOpen" : "eyeClose"}
                />
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm lowercase">{passwordError}</p>}
          </div>

          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054]"
              htmlFor="confirmPassword"
            >
              Confirm Password
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="group border-2 flex px-2 rounded-md focus-within:ring-2 focus-within:ring-blue-200">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                onChange={handleInputChange}
                placeholder="Confirm new password"
                required
                className="group outline-none py-1 w-full"
                value={formData.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible((curr) => !curr)}
              >
                <Image
                  src={
                    isConfirmPasswordVisible ? "/eyeOpen.svg" : "/eyeClose.svg"
                  }
                  alt="hidePassword icon"
                  width={16}
                  height={16}
                  className="cursor-pointer transition-all"
                  key={isPasswordVisible ? "eyeOpenConfirm" : "eyeCloseConfirm"}
                />
              </button>
            </div>
           {confirmPasswordError && <p className="text-red-500 text-sm lowercase">{confirmPasswordError}</p>}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] text-lg"
          >
            Create Password
          </button>
        </div>
      </div>
    </form>
  );
}
