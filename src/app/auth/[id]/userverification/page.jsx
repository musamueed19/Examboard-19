'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

import UserVerificationForm from "../../../../components/Forms/UserVerificationForm"

export default function UserVerificationPage({  }) {

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
        <h1 className="text-[#226ffe] font-semibold text-3xl">User Verification</h1>
        <UserVerificationForm id={userId} />
        {/* {userId} */}
      </div>
    </div>
  )
}
















{
  /*
import CodeVerification from "@/components/Forms/CodeVerification";
import { useState } from "react";
export default function UserVerificationCode() {
  const [verify, setVerify] = useState(false);
  const handleVerifyClick = () => {
    setVerify(true);
  };
  return verify ? (
    <SetPassword></SetPassword>
  ) : (
    <CodeVerification
      title={"User"}
      onVerify={handleVerifyClick}
    ></CodeVerification>
  );
}


  // const [userId, setUserId] = useState(null)

  // async function fetchId() {
  //     await setUserId(params.id);
  //     console.log(userId);
  // }

  // useEffect(() => {
  //   fetchId();
  // }, [])

*/
}