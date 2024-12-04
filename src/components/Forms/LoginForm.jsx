"use client";
// To store user session - in the cookie - for middleware
import Cookies from "js-cookie";

// Asterisk icon
import { CgAsterisk } from "react-icons/cg";

// Password icons
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// using react hooks
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// using next link - for navigating to the Forgot Password Page - section
import Link from "next/link";

// Server Action - Login User
import { loginUser } from "../../lib/Fetcher/getAuth";
import { BadgeAlert, Loader2 } from "lucide-react";

// server side messages - icons
import { HiMiniCheckBadge } from "react-icons/hi2";



export default function LoginForm() {
  // Storing user Login - input Data
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    serverError: "",
    serverSuccess: "",
  });

  // Regular expression - for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
  
  // Using Hook to show user about - please wait - Section
  const [isPending, startTransition] = useTransition();
  const router = useRouter();




  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // In this context, we will only be removing the Errors - Section

    // Removing error, when user finally enters a valid email. (Email Section)
    if (name === "email") {
      // Remove emailError, when user enter any word.
      if (value !== "") handleErrorChange("emailError", "");
      // Remove emailError, when user enters a valid email.
      if (emailRegex.test(value)) handleErrorChange("emailError", "");
    }


    // Same doing for the password
    else if (name === "password") {
      // Remove passwordError, when user enter any word.
      if (value !== "") handleErrorChange("passwordError", "");
    }
  }

  function handleErrorChange(name, value = "") {
    setErrors({
      ...errors,
      [name]: value,
    })
  }

  function focusLossHandler(name, value) {

    // Checking if the Input field's (name) is an "email" or not. (All the email input validation - error checks) - (Email Section)
    if (name === "email") {
      // Testing a valid email
      if (value === "") {
        handleErrorChange("emailError", "required");
      }
      else if (!emailRegex.test(value)) {
        // email is invalid, now save in the emailError object.
        handleErrorChange("emailError", "invalid email");
      } else {
        // email is valid, now remove error in the emailError object.
        handleErrorChange("emailError", "");
      }
    }


    // Now, doing same for the password field.
    else if (name === "password") {
      // Checking, if password field is empty, show passwordError.
      if (value === "") {
        handleErrorChange("passwordError", "required");
      } else {
        // password is valid, now remove error in the passwordError object.
        handleErrorChange("passwordError", "");
      }
    }
  }

  function submitHandler(event) {
    event.preventDefault();

    // We will clear all the server messages first (first).
    handleErrorChange("serverSuccess", "");
    handleErrorChange("serverError", "");

    
    focusLossHandler("email", loginData.email);
    focusLossHandler("password", loginData.password);

    if (errors.emailError !== "" || errors.passwordError !== "") return;
    


    // Now, at this stage, loginData is in valid stage.
    startTransition(async () => {
      console.log(loginData);

      // Fetching login from the backend - Server Action
      const res = await loginUser(loginData);
      console.log(res);

      // If fetching from backend does not resides in, statusCode ~ (200, 299). We will show server error on the Top.
      if (!res.success) {
        handleErrorChange("serverError", res.error);

        return;
      }

      // As, we have success, so we will remove server Error message.
      handleErrorChange("serverError", "");

      // Now, the backend responds with success. So, we can store. User related data & Token in the Cookie.
      Cookies.set("userData", JSON.stringify(res.data), {
        expires: 0.5 / 24, // 30 minutes expressed as a fraction of a day
        path: "/",
        sameSite: "strict",
      });

      // Now, we will show error on successful, cookie storing. Show server success - message on the Top
      handleErrorChange("serverSuccess", "Welcome back! " + res.data.user.name);
      // console.log(res.data.user.name);

      console.log(errors.serverError, errors.serverSuccess);

      // now, after 0.5 second. I will navigate User automatically to the Home ('/') page.
      setTimeout(() => {
        router.push("/");
      }, 1000);
    })
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-10">
        <div className="space-y-3">
          {(errors.serverError !== "" && errors.serverSuccess === "") && (
            <p className="bg-red-100/90 font-bold text-red-600 py-2.5 px-4 rounded-md mb-4 flex items-center gap-2">
              <BadgeAlert /> {errors.serverError}
            </p>
          )}
          {(errors.serverSuccess !== "" && errors.serverError !== "") && (
            <p className="bg-green-400 py-2.5 px-4 rounded-md mb-4 text-white font-medium flex items-center gap-2">
              <HiMiniCheckBadge size={26} /> {errors.serverSuccess}
            </p>
          )}

          {/* User Email Input - Section */}
          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054] flex items-center"
              htmlFor="email"
            >
              Email
              <CgAsterisk size={12} className="text-red-500 -mt-3" />
            </label>

            {/* Input & Validation - Section */}
            <div
              className={`group ${
                errors.emailError === ""
                  ? "border-2 focus-within:ring-blue-200"
                  : "border-red-500 border focus-within:ring-red-200"
              } flex px-2 rounded-md items-center focus-within:ring-2`}
            >
              <input
                type="email"
                name="email"
                className="w-full outline-none group py-1"
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                value={loginData.email}
                onBlur={(e) => {
                  console.log(e.target.name, e.target.value);
                  focusLossHandler(e.target.name, e.target.value);
                }}
              />
              {errors.emailError !== "" && (
                <BadgeAlert size={24} className="text-red-600 w-fit h-fit" />
              )}
            </div>
            {errors.emailError !== "" && (
              <p className="text-red-500 font-medium text-sm lowercase">
                {errors.emailError}
              </p>
            )}
          </div>

          {/* User Password Input - Section */}
          <div className="flex flex-col">
            <label
              className="font-medium text-lg text-[#344054] flex items-center"
              htmlFor="password"
            >
              Password
              <CgAsterisk size={12} className="text-red-500 -mt-3" />
            </label>
            <div
              className={`group ${
                errors.passwordError === ""
                  ? "border-2 focus-within:ring-blue-200"
                  : "border-red-500 border focus-within:ring-red-200"
              } flex px-2 rounded-md focus-within:ring-2`}
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="group outline-none py-1 w-full"
                value={loginData.password}
                onBlur={(e) => {
                  console.log(e.target.name, e.target.value);
                  focusLossHandler(e.target.name, e.target.value);
                }}
              />
              <div className="flex space-x-2 items-center">
                {errors.passwordError !== "" && (
                  <BadgeAlert size={24} className="text-red-600" />
                )}
                <button
                  className="outline-none focus:ring-2 focus:ring-blue-500 h-fit my-auto rounded-md p-0.5"
                  type="button"
                  onClick={() => setIsPasswordVisible((curr) => !curr)}
                >
                  {isPasswordVisible ? (
                    <FaRegEye className="text-gray-700" size={20} />
                  ) : (
                    <FaRegEyeSlash className="text-gray-700" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Showing error, if password field is Invalid  */}
            {errors.passwordError !== "" && (
              <p className="text-red-500 font-medium text-sm lowercase">
                {errors.passwordError}
              </p>
            )}
          </div>
          <div className="flex justify-end items-center">
            <Link
              className="text-[#3fa2f7] text-sm outline-none focus:underline hover:underline"
              href="/auth/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          disabled={
            isPending ||
            errors.emailError !== "" ||
            errors.passwordError !== "" ||
            loginData.email === "" ||
            loginData.password === ""
          }
          type="submit"
          className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] flex items-center justify-center text-lg disabled:bg-[#6299ff]"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Please wait
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}
