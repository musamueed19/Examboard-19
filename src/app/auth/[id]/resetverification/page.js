"use client";
import ResetVerificationForm from "@/components/Forms/ResetVerificationForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ResetVerificationPage({}) {
  const params = useParams(); // This hook will give you the parameters
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (params && params.id) {
      setUserId(params.id);
      console.log(params.id);
    }
  }, [params]);

  return (
    <div className="w-full h-full bg-[#eeeeee] flex items-center justify-center">
      <div className="md:max-w-sm w-full h-full md:h-fit p-8 bg-white rounded-md flex flex-col gap-8 items-center justify-center drop-shadow-xl">
        {/* Page Body, Header, &  Form */}
        <h1 className="text-[#226ffe] font-semibold text-3xl">
          Reset Verification
        </h1>
        <ResetVerificationForm id={userId} />
        {/* {userId} */}
      </div>
    </div>
  );
}
