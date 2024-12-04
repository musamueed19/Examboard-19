"use client";
import { useEffect, useState } from "react";
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import axios from "axios";

const columns = ["Course", "Faculty", "Contribution", "Role"];
const actions = {
  actions: true,
  all: true,
};
const statusOptions = [1, 2, 3];

export default function CourseAllocationPage({ section,id, type }) {
  console.log("Section ID:", section.id);

  const [records, setRecords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };
  console.log('Section id is ',id);
  

  // Fetch API Data
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/editSection/${id}`,
          { cache: "no-store" }
        );

        // Check if the response contains the expected data
        if (response.data && response.data.sectionCoordinators) {
          const data = response.data.sectionCoordinators;

          const mappedRecords = data.map((item) => ({
            Course: item.course || "N/A",
            Faculty: item.faculty?.name || "N/A",
            Contribution: item.contribution || "N/A",
            Role: item.role || "N/A",
            id: item.id, // Ensure `id` is mapped for selection
          }));

          setRecords(mappedRecords);
          setError(null); // Clear errors if successful
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("Failed to fetch data. Please try again later.");
        setRecords([]); // Clear records on error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (id) fetchRecords(); // Ensure the API is called only when `id` is available
  }, [id]);

  return (
    <div className="container">
      <div className="flex">
      <TitleHeader
          fontSize="xl"
          alignment="start"
          margin="ml-8"
          title="Manage Course Allocation:"
        />
      </div>
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="sectioncoordinator" />
          {/* Uncomment and implement this if needed */}
          {/* <InputFields
            label="Semester Status"
            required={true}
            input="dropdown"
            name="status"
            options={statusOptions}
          /> */}
        </div>
        <div className="actionsGroup">
          <BulkDelete
            ids={selectedIds}
            label=" Course Allocation"
            path="managecourseallocationForm"
          />
          <FormModal
            title="Add"
            type="create"
            table="managecourseallocationForm"
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table
          columns={columns}
          records={records}
          actions={actions}
          table="managecourseallocationForm"
          label="Course Allocation"
          count={records.length}
          onSelectedIdsChange={handleSelectedIdsChange}
        />
      )}
      {records.length > 0 && <Pagination />}
    </div>
  );
}
