import TitleHeader from "@/components/common/TitleHeader";
import Table from "@/components/common/Table";
import Pagination from "@/components/common/Pagination";
import Filter from "@/components/common/Filter";
const columns = ["Course", "Exam", "Total", "Marked", "Unmarked"];

const actions = {
  actions: true,
  update: false,
  view: true,
  delete: false,
  all: false,
};


export default function dailyQbStatus() {
  const records = [
    {
      course: "cs304",
      exam: "Mid-term",
      total: 700,
      marked: 200,
      unmarked: 150,
    },

    {
      course: "cs101",
      exam: "FinalTerm",
      total: 450,
      marked: 150,
      unmarked: 300,
    },
  ];
  const semOptions = [
    {value: "all"},
    {value: "Summer Semester"},
    {value: "Spring Semester"},
    
  ];
  const courseOptions = [
    {value: "all"},
    {value: "CS504"},
    {value: "CS601"},
    
  ];
  const examOptions = [
    {value: "all"},
    {value: "Midterm"},
    {value: "Finalterm"},
    
  ];

  return (
    <>
      <div className="container">
        <TitleHeader title="Daily Question Bank Status Management" />

        <div className="flex mx-7 my-5 flex-col md:flex-row gap-2">
      <  Filter label="Semester Status" name="Semester status" options={semOptions} />
          <br />
          <  Filter label="Course" name="Course" options={courseOptions} />

          <br />
          <  Filter label="Exam" name="Exam" options={examOptions} />

          <br />
          <div className="p-2">
            <label>Date</label>
            <br />
            <input
              type="date"
              className="capitalize w-full rounded-md p-1 border border-black/50 bg-[#eaeaea] outline-none text-sm cursor-pointer"
            />
          </div>
        </div>

        <Table
        checkboxes={false}
          columns={columns}
          records={records}
          actions={actions}
          table="dailyQbStatus"
          label="QB Status"
          count={6}
        />
        {records.length > 10 && <Pagination />}
      </div>
    </>
  );
}
