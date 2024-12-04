
{/*
'use client'
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/(dashboard)/layout";
import { useEffect, useState } from "react";
import TitleHeader from "../common/TitleHeader";
import Loginpage from "@/app/auth/login/page";

export default function AccountStateHandler() {
  const router = useRouter()

  // console.log(typeof stateHandler);

  useEffect(() => {
    console.log(process.env.ISLOGGIN);
  }, [process.env.ISLOGGIN]);

  return (
    <div className="w-full h-full">
      {process.env.ISLOGGIN ? (
        <DashboardLayout>
          <div className="flex w-full h-full text-[#1d4ed8] items-center justify-center">
            <TitleHeader
              title="Welcome to Our Dashboard Page!"
              fontSize="4xl"
            />
          </div>
        </DashboardLayout>
      ) : (
        router.push("/auth/login")
      )}
    </div>
  );
}

*/}