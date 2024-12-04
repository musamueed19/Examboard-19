"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import Pagination from "../common/Pagination";
import CourseAllocationPage from "@/app/(dashboard)/sectioncoordinator/[id]/ManageCourseAllocation/page";
import Btns from "../common/Btns";
import Table from "../common/Table";
export const ViewSectionPage = ({ id, type, handleCancel }) => {
  const [records, setRecords] = useState([]);
  const [semesterDetails, setSemesterDetails] = useState({ id: "", title: "" });
  const [formData, setFormData] = useState({
    section_id: "",
  });

  const columns = ["Coordinator", "from", "to", "Status"];
  const actions = { actions: true, view: true };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections`
        );
        if (!response.ok) throw new Error("Failed to fetch sections");

        const data = await response.json();

        if ((type === "view" || type === "update") && data.length > 0) {
          const sectionData = data.find((item) => item.id === id);
          if (sectionData) {
            setFormData({
              section_id: sectionData.sectionId,
              coordinator_id: sectionData.coordinator_id || "",
              section: sectionData.section?.title || "N/A",
            });
            setSemesterDetails({
              id: sectionData.semester?.id || "",
              title: sectionData.semester?.title || "N/A",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching sections:", error.message);
      }
    };
    fetchSections();
  }, [id, type]);
  useEffect(() => {
    const viewSection = async () => {
      if (type !== "view" || !formData.section_id) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/viewSection/${formData.section_id}`;
        const res = await getAll(url);

        if (res.success && Array.isArray(res.data.sectionCoordinators)) {
          setRecords(
            res.data.sectionCoordinators.map((coordinator) => ({
              facultyName: coordinator.faculty?.name || "N/A",
              fromDate: new Date(coordinator.from_date)
                .toISOString()
                .split("T")[0],
              toDate:
                coordinator.to_date === null
                  ? "-"
                  : new Date(coordinator.to_date).toISOString().split("T")[0],
              active: coordinator.semester?.is_Active ? "Active" : "Inactive",
            }))
          );
        } else {
          setRecords([]);
        }
      } catch (error) {
        console.error("Error fetching section data:", error.message);
      }
    };

    viewSection();
  }, [type, formData.section_id]);

  return (
    <>
      <div>
        <h1 className="font-bold text-4xl text-center py-4">
          View Section & Coordinator
        </h1>
        <div className="flex justify-start gap-9 px-6 ">
          <h1 className="font-medium flex gap-6">
            Semester:{" "}
            <span className="font-normal">{semesterDetails.title}</span>
          </h1>
          <h1 className="font-medium  flex gap-6">
            Section: <span className="font-normal">{formData.section}</span>
          </h1>
        </div>
        <div className="flex flex-col items-center  w-full py-6">
          <div className="flex flex-col gap-0 items-center"></div>
          <Table
            columns={columns}
            records={records}
            actions={actions}
            table="viewsectioncoordinatorform"
            label="  View Section Coordinator"
            count={5}
          />
          <Pagination />
          {/* <CourseAllocationPage id={id} /> */}
          <Btns type="primary" title="Close" onClick={handleCancel} />
        </div>
      </div>
    </>
  );
};
