"use client";

import { useState } from "react";
import Btns from "../common/Btns";
import InputFields from "../common/InputFields";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

export default function EditSemesterForm({ type, semester }) {
  const router = useRouter();
  const statusOptions = [
    {
      value: "Active",
      name: "Active",
    },
    {
      value: "InActive",
      name: "InActive",
    },
  ];
  console.log(semester);

  const [formData, setFormData] = useState({
    semesterName: semester?.title || "",
    status: semester?.is_Active ? "Active" : "InActive",
    startDate: semester?.start_date || "",
    endDate: semester?.end_date || "",
    midStartDate: semester?.mid_term_date || "",
    midEndDate: semester?.mid_term_end_date || "",
    finalStartDate: semester?.final_term_date || "",
    finalEndDate: semester?.final_term_end_date || "",
  });

  console.log(formData);

  const [semesterNameError, setSemesterNameError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dateErrors, setDateErrors] = useState({
    startDate: "",
    midDates: "",
    finalDates: "",
  });

  const handleChange = (name, value) => {
    console.log(name,value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "semesterName") setSemesterNameError("");
    if (name === "status") setStatusError("");
    setDateErrors({ startDate: "", midDates: "", finalDates: "" });
  };

console.log(statusError);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let dateValidationPassed = true;


    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      setDateErrors((prev) => ({
        ...prev,
        startDate: "Start date cannot be after end date",
      }));
      dateValidationPassed = false;
    }
    
    if (formData?.midStartDate && formData?.midEndDate && formData?.midStartDate > formData?.midEndDate) {
      setDateErrors((prev) => ({
        ...prev,
        midDates: "Midterm start date cannot be after midterm end date",
      }));
      dateValidationPassed = false;
    }
    
    if (
      formData?.midStartDate &&
      formData?.midEndDate &&
      (formData?.midStartDate > formData.endDate || formData?.midEndDate > formData.endDate)
    ) {
      setDateErrors((prev) => ({
        ...prev,
        midDates: "Midterm dates cannot be after semester end date",
      }));
      dateValidationPassed = false;
    }
    
    if (
      formData?.midStartDate &&
      formData?.midEndDate &&
      formData?.finalStartDate &&  // Ensure finalStartDate is present
      (formData?.midStartDate > formData?.finalStartDate || formData?.midEndDate > formData?.finalStartDate)
    ) {
      setDateErrors((prev) => ({
        ...prev,
        midDates: "Midterm dates cannot be after final term dates",
      }));
      dateValidationPassed = false;
    }
    
    
    if (
      formData?.midStartDate &&
      formData?.midEndDate &&
      (formData?.midStartDate < formData.startDate || formData?.midEndDate < formData.startDate)
    ) {
      setDateErrors((prev) => ({
        ...prev,
        midDates: "Midterm dates cannot be before semester start date",
      }));
      dateValidationPassed = false;
    }
    
    if (formData?.finalStartDate && formData?.finalEndDate) {
      if (formData?.finalStartDate > formData.endDate || formData?.finalEndDate > formData.endDate) {
        setDateErrors((prev) => ({
          ...prev,
          finalDates: "Final term dates cannot be after semester end date",
        }));
        dateValidationPassed = false;
      }
    
      if (formData?.finalStartDate > formData?.finalEndDate) {
        setDateErrors((prev) => ({
          ...prev,
          finalDates: "Final term start date cannot be after final term end date",
        }));
        dateValidationPassed = false;
      }
    }
    

    if (!dateValidationPassed) return;

    const body = {
      title: capitalizeFirstLetter(formData.semesterName),
      start_date: formData.startDate,
      end_date: formData.endDate,
      mid_term_date: formData?.midStartDate || null,
      mid_term_end_date: formData?.midEndDate || null,
      final_term_date: formData?.finalStartDate || null,
      final_term_end_date: formData?.finalEndDate || null,
      is_Active: formData.status === "Active",
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters/${semester.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        router.push(`/semesters?message=Semester updated successfully`);
        router.refresh("/semester");
        mutate(`/semesters/${semester.id}`);
      } else {
        if (responseData.message.includes("one semester can be active")) {
          setStatusError("Only one semester can be active at a time");
          console.log(statusError);
          
        } else if (responseData.message.includes("Dates conflict")) {
          setSemesterNameError("Dates conflict with an existing semester");
        }
      }
    } catch (error) {
      console.error("Error updating semester", error);
    }
  };

  function handleCancel(event) {
    event.preventDefault();
    router.back();
  }

  return (
    <form onSubmit={handleSubmit}>
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="lg:w-[80%] mx-auto">
                <div className="flex justify-start w-[46%]">
                  <InputFields
                    congest={true}
                    type="view"
                    inline={true}
                    label="Semester Name"
                    name="semesterName"
                    id="semesterName"
                    value={formData.semesterName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="lg:w-[80%] mx-auto">
                <div className="w-[46%] flex justify-start">
                  <InputFields
                    congest={true}
                    type="update"
                    label="Semester Status"
                    inline={true}
                    required={true}
                    input="dropdown"
                    name="status"
                    options={statusOptions}
                    value={formData.status}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {statusError && (
                <p className="text-red-500 text-sm">{statusError}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex justify-between gap-12 w-4/5">
                <InputFields
                  type="update"
                  inline={true}
                  name="startDate"
                  label="Start Date"
                  input="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <InputFields
                  type="update"
                  inline={true}
                  name="endDate"
                  label="End Date"
                  input="date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              {dateErrors.startDate && (
                <p className="text-red-500 text-sm">{dateErrors.startDate}</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex justify-between gap-12 w-4/5">
                <InputFields
                  type="update"
                  inline={true}
                  name="midStartDate"
                  label="MidTerm Date"
                  input="date"
                  value={formData.midStartDate}
                  onChange={handleChange}
                />
                <InputFields
                  type="update"
                  inline={true}
                  name="midEndDate"  
                  label="MidTerm End Date"
                  input="date"
                  value={formData.midEndDate}
                  onChange={handleChange}
/>

              </div>
              {dateErrors.midDates && (
                <p className="text-red-500 text-sm">{dateErrors.midDates}</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex justify-between gap-12 w-4/5">
                <InputFields
                  type="update"
                  inline={true}
                  name="finalStartDate"
                  label="FinalTerm Date"
                  input="date"
                  value={formData.finalStartDate}
                  onChange={handleChange}
                />
                <InputFields
                  type="update"
                  inline={true}
                  name="finalEndDate"
                  label="FinalTerm End Date"
                  input="date"
                  value={formData.finalEndDate}
                  onChange={handleChange}
                />
              </div>
              {dateErrors.finalDates && (
                <p className="text-red-500 text-sm">{dateErrors.finalDates}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-8 justify-end w-[90%]">
            <Btns type="primary" title="Cancel" onClick={handleCancel} />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ) : type === "view" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex w-4/5 justify-between">
              <InputFields
                type="view"
                inline={true}
                label="Semester Name"
                name="semesterName"
                id="semesterName"
                value={formData.semesterName}
              />
            </div>
            <div className="flex w-4/5 justify-between">
              <InputFields
                type="view"
                label="Semester Status"
                inline={true}
                name="status"
                value={formData.status ? "Active" : "InActive"}
              />
            </div>
            <div className="flex flex-col items-center gap-16 w-full">
              <div className="flex justify-between w-4/5">
                <InputFields
                  type="view"
                  inline={true}
                  name="startDate"
                  label="Start Date"
                  value={formData.startDate}
                />
                <InputFields
                  type="view"
                  inline={true}
                  name="endtDate"
                  label="End Date"
                  value={formData.endDate}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-16 w-full">
              <div className="flex justify-between w-4/5">
                <InputFields
                  type="view"
                  inline={true}
                  name="midStartDate"
                  label="MidTerm Date"
                  value={formData.midStartDate}
                />
                <InputFields
                  type="view"
                  inline={true}
                  name="midendtDate"
                  label="MidTerm End Date"
                  value={formData.midEndDate}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-16 w-full">
              <div className="flex justify-between w-4/5">
                <InputFields
                  type="view"
                  inline={true}
                  name="finalStartDate"
                  label="FinalTerm Date"
                  value={formData.finalStartDate}
                />
                <InputFields
                  type="view"
                  inline={true}
                  name="finalEndDate"
                  label="FinalTerm End Date"
                  value={formData.finalEndDate}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-end w-[90%]">
            <Btns type="primary" title="Close" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        type === "delete" && null
      )}
    </form>
  );
}
