"use client";
import AddBtn from "@/components/common/AddBtn";
import BulkDelete from "@/components/common/BulkDelete";
import FormModal from "@/components/common/FormModal";
import SuccessToast from "@/components/common/new comp/SuccessToast";
import Pagination from "@/components/common/Pagination";
import Searchbar from "@/components/common/Searchbar";
import Table from "@/components/common/Table";
import TitleHeader from "@/components/common/TitleHeader";
import { useState, useEffect } from "react";

const columns = ["Section", "Coordinator", "Semester", "from"];
const actions = {
  actions: true,
  all: true,
};
let statusOptions = [1, 2, 3];

export default function SectionCoordinatorManagementPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState("");

  const handleSelectedIdsChange = (ids) => {
    setSelectedIds(ids);
  };

  function showMessageStrip() {
    if (refresh !== "") {
      console.log(refresh);
      setTimeout(() => {
        setRefresh("");
      }, 1000);
    }
  }

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections`,
          { cache: "no-store" },
          { next: { tags: ["sections"] } }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await response.json();
        console.log(`and the data is ${data}`);

        setRecords(
          data.map((item) => ({
            section: item.section.title,

            coordinator: item.faculty.name,
            semester: item.semester.title,
            from: new Date(item.from_date).toISOString().split("T")[0],
            to:
              item.to_date === null
                ? "-"
                : new Date(item.to_date).toISOString().split("T")[0],
            id: item.id,
            section_id: item.section.id,
            coordinator_id: item.faculty.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching sections:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchSections();
    showMessageStrip();
  }, [refresh]);

  return (
    <div className="container">
      {refresh !== "" && <SuccessToast content={refresh} />}
      <TitleHeader title="Section & Coordinator Management" />
      <div className="tableTopNav">
        <div className="filtersGroup">
          <Searchbar label="Search" path="sectioncoordinator" />
          {/* Uncomment when adding dropdown
          <InputFields
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
            label="Section coordinator"
            path="sections"
            setRefresh={setRefresh}
          />
          <FormModal title="Add" type="create" table="sectioncoordinator" setRefresh={setRefresh}/>
        </div>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <Table
          columns={columns}
          records={records}
          actions={actions}
          table="sectioncoordinator"
          label="Section Coordinator"
          count={5}
          setRefresh={setRefresh}
          url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/sections`}
          onSelectedIdsChange={handleSelectedIdsChange}
          
        />
      )}
      {records.length > 0 && <Pagination />}
    </div>
  );
}
