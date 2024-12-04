"use client";

import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import { useEffect } from "react";

export default function TestAPIPage() {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths/add`;

  async function FetchData() {
    let res = await getAll(url);
    if (res.success) console.log(res.data.title);
    else console.log("ERR -------", res.error);
  }

  useEffect(() => {
    FetchData();
  }, []);

  return <div></div>;
}
