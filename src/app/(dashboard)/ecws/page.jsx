"use client";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import TitleHeader from "@/components/common/TitleHeader";
import Table from "@/components/common/Table";
import axios from "axios";
import { getSemesterTitle } from "@/components/Fetcher/getSemester";
import Searchbar from "@/components/common/Searchbar";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import SuccessToast from "@/components/common/new comp/SuccessToast";

export default function ExamStrength() {
  const actions = {
    actions: "true",
    all: "true",
  };

  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState("");

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
  const columns = ["Semester", "Course", "Exam Type", "Students", "Exam Date"];
  // {  "id":"CS201P",  "title":"course454",  "student_enrollment":7,  "type":"Regular"}
  async function fetchExamStrength() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths?search&limit=10&page=1`
      );
      if (response.data.status === 404) {
        console.log(response.status);
      } else {
        const formattedRecords = response.data.map((item) => ({
          semester: item.semester,
          course: item.courseId,
          exam: item.exam,
          num_of_students: item.num_of_students,
          date: new Date(item.date).toISOString().split("T")[0],
          id: item.id,
        }));
        setRecords(formattedRecords);
        console.log(formattedRecords);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching Exam Strength:", error.status);
    }
    // console.log(formattedRecords);
  }
  useEffect(() => {
    fetchExamStrength();
    showMessageStrip();
  }, [refresh]);

  return (
    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Exam Course Wise Strength Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="semesters" />
        </div>
        <div className="actionsGroup">
          <BulkDelete
            setRefresh={setRefresh}
            ids={selectedIds}
            label="ecws"
            path="ecws"
          />
          <FormModal
            setRefresh={setRefresh}
            title="Add"
            type="create"
            table="ecws"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          setRefresh={setRefresh}
          columns={columns}
          actions={actions}
          records={records}
          table="ecws"
          count={columns.length}
          label="ECWS"
          onSelectedIdsChange={handleSelectedIdsChange}
        />
      )}
      <Pagination />
    </div>
  );
}
