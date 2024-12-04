"use client";
import { useState, useEffect } from "react";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import InputFields from "@/components/common/InputFields";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import SuccessToast from "@/components/common/new comp/SuccessToast";

export default function ExamPaper({ semester }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false); // General loading for data fetching
  const [initialLoading, setInitialLoading] = useState(true); // Only for initial load
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("All");
  const [refresh, setRefresh] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  const columns = ["Exam Type", "Marks", "No. of Questions", "Course Type"];
  const actions =
    semester.type === "update"
      ? { actions: true, update: true, delete: true }
      : { actions: false };

  const statusOptions = [
    { value: "All", name: "All" },
    { value: "Active", name: "Active" },
    { value: "InActive", name: "InActive" },
  ];

  useEffect(() => {
    const fetchExamPapers = async () => {
      setLoading(true);
      if (initialLoading) setInitialLoading(true); // Only set for first load

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/examType/${semester.id}?search=${searchTerm}&limit=${rows}&page=${page}`,
          {
            cache: "no-store",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch exam papers");

        const { data, total } = await response.json();
        const formattedRecords = data.map((item) => ({
          examType: item.exam_type,
          marks: item.question_marks,
          quantity: item.question_quantity,
          courseType: item.courseType,
          id: item.id,
        }));

        setRecords(formattedRecords);
        setTotalRecords(total);
      } catch (error) {
        console.error("Error fetching exam papers:", error);
        setError(error);
      } finally {
        setLoading(false);
        if (initialLoading) setInitialLoading(false); // Set to false after initial load
      }
    };

    fetchExamPapers();
    showMessageStrip();
  }, [searchTerm, status, refresh, semester.id, rows, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, rows, refresh]);

  const handleSelectedIdsChange = (ids) => setSelectedIds(ids);

  // Render loading state only for initial page load
  if (initialLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  // Calculate total pages based on the total records and rows per page
  const totalPages = Math.ceil(totalRecords / rows);

  return (
    <div className="h-fit w-full min-w-full rounded-xl bg-white py-2 lg:py-4">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader
        fontSize="xl"
        alignment="start"
        margin="ml-8"
        title="Manage Exam Paper Settings"
      />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar
            label="Exam Type"
            searchValue={searchTerm || ""}
            setSearchValue={setSearchTerm}
            path="examType"
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="exam papers"
            path="examType"
            setRefresh={setRefresh}
          />
          <FormModal
            title="Add Exam Paper"
            type="create"
            table="examType"
            semester={semester}
            setRefresh={setRefresh}
          />
        </div>
      </div>
      <Table
        columns={columns}
        records={records}
        actions={actions}
        table="examType"
        count={records.length}
        label="Exam Paper"
        onSelectedIdsChange={handleSelectedIdsChange}
        semester={semester}
        setRefresh={setRefresh}
      />
      {totalRecords > 10 && (
        <Pagination
          rows={rows}
          setRows={setRows}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
