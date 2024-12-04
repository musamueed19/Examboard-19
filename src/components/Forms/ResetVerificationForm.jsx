"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetVerify } from "@/lib/Fetcher/getAuth";
import Image from "next/image";

export default function ResetVerificationForm({ id }) {
  const router = useRouter();

  const [otp, setOtp] = useState(new Array(4).fill(""));

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [OtpError, setOtpError] = useState("");

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return false;

    setOtp([
      ...otp.map((data, indx) => (index === indx ? e.target.value : data)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    setError("");
    
    if (otp.length < 4 || otp.includes("")) {
      setOtpError("Incomplete code");
      return;
    }

    setOtpError("");

    const res = await resetVerify(+otp.join(""), id);
    if (!res.success) {
      setError(typeof res.error === "string" ? res.error : "An error occurred");
      return;
    }
    console.log(res, res.data);
    setSuccess(res.data);

    setTimeout(() => {
      router.push(`/auth/${id}/resetpassword`);
    }, 500);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="w-fit flex flex-col items-center gap-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2">
          {error && <p className="bg-[#faeae8] text-[#640d06] py-2.5 px-4 rounded-md mb-4 flex items-center gap-2">
            <Image src="/alert.svg" alt="error icon" width={20} height={20} /> {error}
          </p>}
          {success && (
            <p className="bg-green-400 py-2.5 px-4 rounded-md mb-4 text-white font-medium flex items-center gap-2">
              <Image src="/successfull.svg" alt="error icon" width={24} height={24} /> {success}
            </p>
          )}
        <h1>Enter the four digit verification code</h1>
        <div className="flex justify-center gap-4">
          {otp.map((data, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className={`outline-none text-center text-2xl w-[3.5rem] h-[4rem] ${success !== "" ? "border-green-300/70" : "border-gray-400/70"} ${error !== "" ? "border-red-300/70" : "border-gray-400/70"} border-2 p-1 rounded-xl focus:ring-4 focus:ring-blue-200`}
              value={data}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        {OtpError && <p className="text-red-500 text-sm lowercase">{OtpError}</p>}
      </div>
      <button
        type="submit"
        className="bg-[#226ffe]/90 hover:bg-[#226ffe] text-white font-medium rounded-md py-2 w-full "
      >
        Verify
      </button>
    </div>
    </form>
  );
}
