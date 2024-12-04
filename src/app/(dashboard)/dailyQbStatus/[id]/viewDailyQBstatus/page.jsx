"use client";
import Btns from "@/components/common/Btns";
import InputFields from "@/components/common/InputFields";
import TitleHeader from "@/components/common/TitleHeader";
import { useRouter } from "next/navigation";

export default function ViewDailyQBstatus() {
  const router = useRouter();

  return (
    <>
      <div className="mt-4">
        <TitleHeader title="View Question Wise Daily Status" />

        <div className="w-3/4 mx-auto space-y-3 mt-8">
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Semester:"
              value="Summer Semester 2024"
            />
            <InputFields
              type="view"
              inline={true}
              label="Courses:"
              value="CS101"
            />
          </div>
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Exam:"
              value="Midterm"
            />
            <InputFields type="view" inline={true} label="Total:" value="770" />
          </div>
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Marked:"
              value="700"
            />
            <InputFields
              type="view"
              inline={true}
              label="Unmarked:"
              value="70"
            />
          </div>
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Cheating:"
              value="0"
            />
            <InputFields
              type="view"
              inline={true}
              label="Reviewable:"
              value="0"
            />
          </div>
          <div className="flex w-1/2">
            <InputFields
              type="view"
              inline={true}
              label="Date:"
              value="12-June-2024"
            />
          </div>

          <div className="w-full flex items-center justify-end">
            <Btns
              onClick={router.back}
              type="primary"
              title="Close"
              btnType="button"
            />
          </div>
        </div>
      </div>
    </>
  );
}
