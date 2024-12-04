"use client";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import SuccessToast from "@/components/common/new comp/SuccessToast";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = ["Course", "Exam Type", "Title"];

const actions = {
  actions: "true",
  all: "true",
};

export default function CoursesManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
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
  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BASE_API_URL
          }/courses?search=${inputValue.trim()}&limit=${rows}&page=${page}`
        );
        console.log(response.data);
        const formattedRecords = response.data.data.map((item) => ({
          course: item.id,
          courseType: item.type,
          title: item.title,
          studentEnrollment: item.student_enrollment,
          id: item.id,
        }));
        setRecords(formattedRecords);

        setTotalRecords(response.data.total);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
    setLoading(false);
    showMessageStrip();
  }, [inputValue, rows, page, refresh]);

  useEffect(() => {
    setPage(1);
  }, [inputValue, rows, refresh]);

  const handleSearchChange = (value) => {
    setInputValue(value); // This will trigger the search useEffect
  };
  const totalPages = Math.ceil(totalRecords / rows);
  return (
    // { children }

    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Courses Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar
            label="Course"
            searchValue={inputValue}
            setSearchValue={handleSearchChange}
            path="courses"
          />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label="courses"
            path="courses"
            setRefresh={setRefresh}
          />
          <FormModal
            title="Add"
            type="create"
            table="courses"
            setRefresh={setRefresh}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          records={records}
          actions={actions}
          setRefresh={setRefresh}
          table="courses"
          count={4}
          label="Course"
          url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/courses`}
          onSelectedIdsChange={handleSelectedIdsChange}
        />
      )}
      <Pagination
        rows={rows}
        setRows={setRows}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
