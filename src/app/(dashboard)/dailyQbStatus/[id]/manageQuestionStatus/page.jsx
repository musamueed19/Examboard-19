"use client";
import TitleHeader from "@/components/common/TitleHeader";
import Table from "@/components/common/OnlyTable";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import ViewDailyQBstatus from "../viewDailyQBstatus/page";
import Filter from "@/components/common/Filter";
import { useRouter } from "next/navigation";
const columns = [
  "QuestionID",
  "Marks",
  "Total",
  "Marked",
  "Unmarked",
  "Faculty",
];

const actions = {
  actions: false,
  update: false,
  view: false,
  delete: false,
  all: false,
};

const marksOptions = [
  { value: "all" },
  { value: 1 },
  { value: 3 },
  { value: 5 },
];
export default function ManageQuestionStatus(label) {
  const records = [
    {
      questionId: 142069,
      marks: 3,
      total: 270,
      marked: 255,
      unmarked: 15,
      faculty: "Sana Rao",
    },
    {
      questionId: 142069,
      marks: 3,
      total: 270,
      marked: 255,
      unmarked: 15,
      faculty: "Sana Rao",
    },
    {
      questionId: 142069,
      marks: 3,
      total: 270,
      marked: 255,
      unmarked: 15,
      faculty: "Sana Rao",
    },
    {
      questionId: 142069,
      marks: 3,
      total: 270,
      marked: 255,
      unmarked: 15,
      faculty: "Sana Rao",
    },
  ];
  const router = useRouter();

  return (
    <>
      {/* View Question Wise Daily Status */}

      {/* Manage Questions Status: */}
      <div className="container">
        <TitleHeader title="Manage Question Status" />
      </div>

      <div className="flex items-center  flex-col md:flex-row">
        <div className="flex mx-7 my-5 flex-col md:flex-row">
          <Searchbar label="Faculty" />
        </div>
        <Filter label="Marks" name="marks" options={marksOptions} />
      </div>

      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="manageQstatus"
        count={6}
      />
      <Pagination />
      <div className="w-full flex items-center justify-end">
        <button
          onClick={router.back}
          className="scale-50 w-[6rem] lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl px-2 py-1 lg:px-4 lg:py-[0.5rem] bg-white font-bold text-[#226ffe] border-2 border-[#226ffe] hover:border-3"
        >
          Close
        </button>
      </div>
    </>
  );
}
