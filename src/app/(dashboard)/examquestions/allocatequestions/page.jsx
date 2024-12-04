"use client";
import Btns from "@/components/common/Btns";
import InputFields from "@/components/common/InputFields";
import TitleHeader from "@/components/common/TitleHeader";
import { useRouter } from "next/navigation";
import Table from "@/components/common/Table";
import AddBtn from "@/components/common/AddBtn";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const columns = ["CourseId", "Faculty", "Exam Type", "AllocatedDate"];

const actions = {
  actions: false,
  update: false,
  view: true,
  delete: false,
  all: false,
};

export default function AllocateExamQuestions() {
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

  const examOptions = [
    {
      value: "MidTerm",
      name: "MidTerm",
    },
    {
      value: "FinalTerm",
      name: "FinalTerm",
    },
  ];
  const[formData, setFormData]= useState({
    faculty:"Member",
    marks: 5,
    exam:"Midterm"
  }); 

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="mt-4">
        <TitleHeader title="Exam Question Management" />

        <div className="flex flex-col w-[95%] lg:w-[80%] xl:w-[70%] items-center mx-auto space-y-3 mt-8">
          <div className="flex w-full gap-2 md:gap-4 lg:gap-8 xl:gap-10">
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
          <div className="flex w-full gap-2 md:gap-4 lg:gap-8 xl:gap-10">
            <InputFields
              type="view"
              inline={true}
              label="Course"
              value="CS101"
            />
            <InputFields
              type="update"
              inline={true}
              input="dropdown"
              label="Exam:"
              name="exam"
              value={formData.exam}
              options={examOptions}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full gap-2 md:gap-4 lg:gap-8 xl:gap-10">
            <InputFields
              type="update"
              inline={true}
              input="dropdown"
              label="Faculty:"
              name="faculty"
              value={formData.faculty}
              options={examOptions}
              onChange={handleChange}
            />
            <InputFields 
            type="update"
             inline={true} 
             input="dropdown"
             label="Marks:" 
             name="marks"
             value={formData.marks}
              options={examOptions}
              onChange={handleChange} 
              />
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
