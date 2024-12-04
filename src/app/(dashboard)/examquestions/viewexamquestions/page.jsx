"use client";
import Btns from "@/components/common/Btns";
import InputFields from "@/components/common/InputFields";
import TitleHeader from "@/components/common/TitleHeader";
import { useRouter } from "next/navigation";
import Table from "@/components/common/Table";
import AddBtn from "@/components/common/AddBtn";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";

const columns = ["CourseId", "Faculty", "Allocated", "AllocatedDate"];

const actions = {
  actions: false,
  update: false,
  view: true,
  delete: false,
  all: false,
};

export default function ViewExamQuestions() {
  const router = useRouter();
  const records = [
    {
      CourseID: "1",
      Faculty: "Member",
      Allocated: "MidTerm",
      AllocatedDate: "5-12-24",
    },
    {
      CourseID: "1",
      Faculty: "Member",
      Allocated: "MidTerm",
      AllocatedDate: "5-12-24",
    },
  ];

  return (
    <>
      <div className="mt-4">
        <TitleHeader title="Exam Question Management" />

        <div className="w-3/4 mx-auto space-y-3 mt-8">
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Question id:"
              value="100484"
            />
            <InputFields
              type="view"
              inline={true}
              label="Semester:"
              value="Spring Semester"
            />
          </div>
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Course"
              value="CS101"
            />
            <InputFields
              type="view"
              inline={true}
              label="Exam:"
              value="MidTerm"
            />
          </div>
          <div className="flex w-full">
            <InputFields
              type="view"
              inline={true}
              label="Faculty:"
              value="Member"
            />
            <InputFields type="view" inline={true} label="Marks:" value="5" />
          </div>
        </div>
        <div className="my-6">
          <div className="tableTopNav">
            <div className="flex justify-end w-full">
              <FormModal title="Add" type="create" table="examquestions" />
            </div>
          </div>
          <Table
            checkboxes={true}
            columns={columns}
            records={records}
            actions={actions}
            table="examquestions"
            label="Exam Question"
            count={5}
          />
          {records.length > 10 && <Pagination />}
          <div className="w-[97%] mt-2 lg:mt-4 flex items-center justify-end">
            <button
              onClick={router.back}
              className="scale-50 w-[6rem] lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl px-2 py-1 lg:px-4 lg:py-[0.5rem] bg-white font-bold text-[#226ffe] border-2 border-[#226ffe] hover:border-3"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
