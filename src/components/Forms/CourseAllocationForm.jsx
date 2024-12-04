"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import { useRouter } from "next/navigation";
import InputFields from "../common/InputFields";
import MessageStrip from "../common/MessageStrip";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";
import { ViewSectionPage } from "./ViewSectionPage";

export default function CourseAllocationForm({ type, section, id }) {
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [sectionCoordinators, setSectionCoordinators] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState("No message");
  const [semesterDetails, setSemesterDetails] = useState({ id: "", title: "" });
  const [formData, setFormData] = useState({
    section_id: id || "",
    coordinator_id: "",
    section: "",
    sectionid: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (section && section.id) {
      setFormData((prevState) => ({
        ...prevState,
        section_id: section.id,
      }));
    }
  }, [section]);

  useEffect(() => {
    const fetchSectionData = async () => {
      if (!formData.section_id) return;

      try {
        console.log("Fetching section data for:", formData.section_id);
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/editSection/${id}`;
        const res = await getAll(url);

        if (res.success && res.data) {
          const facultyDetails = res.data.facultyDetails || [];
          const sectionCoordinators = res.data.sectionCoordinators || [];
          const sectionData = sectionCoordinators[0]?.section || {};
          const semesterData = sectionCoordinators[0]?.semester || {};

          // Set faculty options
          setFacultyOptions(
            facultyDetails.map((item) => ({
              id: item.id,
              value: item.name,
            }))
          );

          // Set section coordinators
          setSectionCoordinators(
            sectionCoordinators.map((coordinator) => ({
              id: coordinator.id,
              facultyName: coordinator.faculty?.name || "N/A",
              fromDate: coordinator.from_date
                ? new Date(coordinator.from_date).toISOString().split("T")[0]
                : "N/A",
              toDate: coordinator.to_date
                ? new Date(coordinator.to_date).toISOString().split("T")[0]
                : "-",
              active: coordinator.semester?.is_Active ? "Active" : "Inactive",
            }))
          );

          // Set section and semester titles
          setFormData((prevState) => ({
            ...prevState,
            section: sectionData.title || "N/A",
          }));

          setSemesterDetails({
            id: semesterData.id || "",
            title: semesterData.title || "N/A",
          });
        } else {
          setFacultyOptions([]);
          setSectionCoordinators([]);
        }
      } catch (error) {
        console.error("Error fetching section data:", error.message);
      }
    };

    fetchSectionData();
  }, [formData.section_id]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (type === "update") {
      if (!formData.coordinator_id) {
        handleError("Please select a coordinator");
        return;
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/editSection/${formData.section_id}`;
        await axios.patch(apiUrl, { coordinator_id: formData.coordinator_id });

        handleSuccess("Section coordinator updated successfully");
      } catch (error) {
        console.error("Error updating coordinator:", error.message);
        handleError("Failed to update the coordinator");
      }
    }
  };

  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => router.push("/sectioncoordinator"), 2000);
  };

  const handleError = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => setIsVisible(false), 3000);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    router.push("/sectioncoordinator");
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === "view" ? (
        <ViewSectionPage id={formData.section_id} type={type} handleCancel={handleCancel} />
      ) : type === "update" ? (
        <div className="flex flex-col gap-8 py-6">
          <h1 className="flex justify-center font-extrabold text-4xl">
            Edit Section & Coordinator
          </h1>
          <div className="w-[90%] mx-auto">
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 w-[80%]">
                <InputFields
                  inline={true}
                  type="view"
                  label="Semester:"
                  value={semesterDetails.title || ""}
                />
                <InputFields
                  inline={true}
                  type="view"
                  label="Section:"
                  value={formData.section || ""}
                />
              </div>
              <div className="flex items-center w-[80%] max-w-[40%]">
                <InputFields
                  inline={true}
                  required={true}
                  label="Coordinator:"
                  input="dropdown"
                  name="coordinator_id"
                  options={facultyOptions}
                  value={formData.coordinator_id || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-end w-[90%]">
            <Btns type="primary" title="Cancel" onClick={handleCancel} />
            <Btns type="secondary" title="Update" btnType="submit" />
            {isVisible && (
              <MessageStrip
                content={content}
                setIsVisible={setIsVisible}
                isVisible={isVisible}
              />
            )}
          </div>
        </div>
      ) : null}
    </form>
  );
}
