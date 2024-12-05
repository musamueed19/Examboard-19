"use client";

// Asterisk icon
import { CgAsterisk } from "react-icons/cg";

// Password icons
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// using react hooks
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// using next link - for navigating to the Forgot Password Page - section
import Link from "next/link";

// Server Action - Login User
import { forgotPassword } from "../../lib/Fetcher/getAuth";
import { BadgeAlert, Loader2 } from "lucide-react";

// server side messages - icons
import { HiMiniCheckBadge } from "react-icons/hi2";

export default function ForgotPasswordForm() {
  // Store User email address, to get proceed - for Reset Password.
  const [userEmail, setUserEmail] = useState("");


  // Store User inputs Validation & Server related Data.
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    serverError: "",
    serverSuccess: "",
    submitted: false,
  });

  // Regular expression - for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;

  // Using Hook to show user about - please wait - Section
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserEmail(value);

    // In this context, we will only be removing the Errors - Section

    // Removing error, when user finally enters a valid email. (Email Section)
    if (name === "email") {
      // Remove emailError, when user enter any word.
      if (value !== "") handleErrorChange("emailError", "");
      // Remove emailError, when user enters a valid email.
      if (emailRegex.test(value)) handleErrorChange("emailError", "");
    }
  }

 function handleErrorChange(name, value = "") {
   setErrors((prevErrors) => ({
     ...prevErrors,
     [name]: value,
   }));
 }

// Now, when user Input focus will loss, This function, will start vaidating the User.
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
  }
 
  
  function submitHandler(event) {
    event.preventDefault();
    
    // We will clear all the server messages first (first).
    handleErrorChange("serverSuccess", "");
    handleErrorChange("serverError", "");

    // Knowing both server side messages.
    console.log("--- showing server error", errors.serverError, ",server success", errors.serverSuccess);


    focusLossHandler("email", userEmail);
    console.log(errors.emailError);

    if (errors.emailError !== "") return;

    // Now, at this stage, loginData is in valid stage.
    startTransition(async () => {
      console.log(userEmail);

      // Fetching login from the backend - Server Action
      const res = await forgotPassword(userEmail);

      // Knowing the responses, returned by the API endpoint.
      console.log(res);

      // If fetching from backend does not resides in, statusCode ~ (200, 299). We will show server error on the Top.
      if (!res.success) {
        // If some server error comes, show this to the user.
        handleErrorChange("serverError", res.error);
// Now immediately return, and wait for user to know the error.
        return;
      }
      return;

      // As, we have success, so we will remove server Error message.
      handleErrorChange("serverError", "");

      // Now, we will show error on successful, cookie storing. Show server success - message on the Top
      handleErrorChange("serverSuccess", res.data);
      // Knowing both server side messages.
      console.log("--- showing server error", errors.serverError, ",server success", errors.serverSuccess);

    });
  }

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div className="flex flex-col gap-10">
        <div className="space-y-3">
          {errors.serverError !== "" && (
            <p className="bg-red-100/90 font-bold text-red-600 py-2.5 px-4 rounded-md mb-4 flex items-center gap-2">
              <BadgeAlert /> {errors.serverError}
            </p>
          )}
          {errors.serverSuccess !== "" && (
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
                value={userEmail}
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
          {/* User Input Field Container - Closing Tag */}
        </div>
        <button
          disabled={
            isPending ||
            errors.emailError !== "" ||
            errors.passwordError !== "" ||
            userEmail === ""
          }
          type="submit"
          className="bg-[#226ffe] text-white w-full p-2 font-medium rounded-lg hover:bg-[#324cf3] flex items-center justify-center text-lg disabled:bg-[#6299ff] outline-none focus:ring-4 focus:ring-blue-200"
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
