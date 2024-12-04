import TitleHeader from "@/components/common/TitleHeader";
import Table from "@/components/common/Table";
import Pagination from "@/components/common/Pagination";
import Filter from "@/components/common/Filter";
import FormModal from "@/components/common/FormModal";
const columns = [
  "QuestionId",
  "Course",
  "Exam",
  "Marks",
  "Faculty",
  "Total",
  "Marked",
  "Unmarked",
  "Date",
];

const actions = {
  actions: true,
  update: true,
  view: true,
  delete: true,
  all: false,
};

export default function examQuestions() {
  const records = [
    {
      QuestionID: "1",
      Course: "CS604",
      Exam: "MidTerm",
      Marks: 5,
      Faculty: "Musa",
      Total: 22,
      Marked: 15,
      UnMarked: 7,
      Date: "2024-11-26",
    },
    {
      QuestionID: "1",
      Course: "CS604",
      Exam: "MidTerm",
      Marks: 5,
      Faculty: "Musa",
      Total: 22,
      Marked: 15,
      UnMarked: 7,
      Date: "2024-11-26",
    },
  ];
  const semOptions = [
    { value: "all" },
    { value: "Summer Semester" },
    { value: "Spring Semester" },
  ];
  const courseOptions = [
    { value: "all" },
    { value: "CS504" },
    { value: "CS601" },
  ];
  const examOptions = [
    { value: "all" },
    { value: "Midterm" },
    { value: "Finalterm" },
  ];
  const marksOptions = [{ value: "all" }, { value: "3" }, { value: "5" }];

  return (
    <>
      <div className="container">
        <TitleHeader title="Exam Question Management" />

        <div className="flex mx-7 my-5 flex-col md:flex-row gap-2">
          <Filter
            label="Semester Status"
            name="Semester status"
            options={semOptions}
          />
          <br />
          <Filter label="Course" name="Course" options={courseOptions} />

          <br />
          <Filter label="Exam" name="Exam" options={examOptions} />

          <br />
          <Filter label="Marks" name="Marks" options={marksOptions} />
        </div>

        <div className="my-4">
          <div className="tableTopNav">
            <div className="flex justify-end w-full">
              <FormModal title="Upload" type="create" table="examquestions" />
            </div>
          </div>
          <Table
            checkboxes={true}
            columns={columns}
            records={records}
            actions={actions}
            table="examquestions"
            label="Exam Question"
            count={10}
            allocate={true}
          />
          {records.length > 10 && <Pagination />}
        </div>
      </div>
    </>
  );
}
