"use client";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { IoClose } from "react-icons/io5"; 
const statusOptions = [
  { value: "Active", name: "Active" },
  { value: "InActive", name: "InActive" },
];

export default function SemesterForm({ setRefresh, type, data, setOpen }) {
  const router = useRouter();
console.log(data, type);

const [formData, setFormData] = useState({
  semesterName: data?.title ?? "",
  status: data?.status ?? "Active",
  startDate: data?.start_date ?? "",
  endDate: data?.end_date ?? "",
  midStartDate: data?.mid_start_date ?? "",
  midEndDate: data?.mid_end_date ?? "",
  finalStartDate: data?.final_start_date ?? "",
  finalEndDate: data?.final_end_date ?? "",
});


  const [semesterNameError, setSemesterNameError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dateErrors, setDateErrors] = useState({
    startDate: "",
    midDates: "",
    finalDates: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value ?? "" }));
    if (name === "semesterName") setSemesterNameError("");
    if (name === "status") setStatusError("");
    setDateErrors({ startDate: "", midDates: "", finalDates: "" });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async () => {};

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  let validationPassed = true;
    if (!formData.semesterName.trim()) {
      setSemesterNameError("Semester name is required.");
      validationPassed = false;
    }
  
    if (!formData.startDate) {
      setDateErrors((prev) => ({
        ...prev,
        startDate: "Start date is required.",
      }));
      validationPassed = false;
    }
  
    if (!formData.endDate) {
      setDateErrors((prev) => ({
        ...prev,
        endDate: "End date is required.",
      }));
      validationPassed = false;
    }
  

    if (type == "create") {
      let dateValidationPassed = true;
      
        
      if (formData.startDate > formData.endDate) {
        setDateErrors((prev) => ({
          ...prev,
          startDate: "Start date cannot be after end date",
        }));
        dateValidationPassed = false;
      }
      

      if (
        formData?.midStartDate &&
        formData?.midEndDate &&
        formData.midStartDate > formData.midEndDate
      ) {
        setDateErrors((prev) => ({
          ...prev,
          midDates: "Midterm start date cannot be after midterm end date",
        }));
        dateValidationPassed = false;
      }
      
      if (
        formData?.midStartDate &&
        formData?.midEndDate &&
        formData?.endDate &&
        (formData.midStartDate > formData.endDate ||
          formData.midEndDate > formData.endDate)
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
        formData?.finalStartDate &&
        (formData.midStartDate > formData.finalStartDate ||
          formData.midEndDate > formData.finalStartDate)
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
        formData?.startDate &&
        (formData.midStartDate < formData.startDate ||
          formData.midEndDate < formData.startDate)
      ) {
        setDateErrors((prev) => ({
          ...prev,
          midDates: "Midterm dates cannot be before semester start date",
        }));
        dateValidationPassed = false;
      }
      
      if (
        formData?.finalStartDate &&
        formData?.finalEndDate &&
        formData?.endDate &&
        (formData.finalStartDate > formData.endDate ||
          formData.finalEndDate > formData.endDate)
      ) {
        setDateErrors((prev) => ({
          ...prev,
          finalDates: "Final term dates cannot be after semester end date",
        }));
        dateValidationPassed = false;
      }
      

      if (formData?.finalStartDate > formData?.finalEndDate) {
        setDateErrors((prev) => ({
          ...prev,
          finalDates:
            "Final term start date cannot be after final term end date",
        }));
        dateValidationPassed = false;
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
          
        console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters/addSemester`, body);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters/addSemester`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const responseData = await response.json();
console.log(responseData);

        if (response.ok) {
          setRefresh("New Semester Added Successfully");
          setOpen(false);
        } else {
          if (response.status === 400 && Array.isArray(responseData.message)) {
            responseData.message.forEach((error) => {
              if (error.includes("title")) {
                setSemesterNameError("Semester name is required.");
              } else if (error.includes("start_date")) {
                setDateErrors((prev) => ({
                  ...prev,
                  startDate: "Start date is required.",
                }));
              } else if (error.includes("end_date")) {
                setDateErrors((prev) => ({
                  ...prev,
                  startDate: "End date is required.",
                }));
              }
            });
          } 
          if (responseData.message.includes("already exists")) {
            setSemesterNameError(
              `${formData.semesterName} semester already exists`
            );
          } else if (responseData.message.includes("already active")) {
            setStatusError("Only one semester can be active at a time");
          } else if (responseData.message.includes("Dates conflict")) {
            setSemesterNameError("Dates conflict with an existing semester");
          }
        }
      } catch (error) {
        console.error("Error creating semester", error);
      }
    }
     else {
      if (!data?.id) {
        console.error("No ID provided for deletion");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/semesters?id=${data.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setRefresh("Semester Deleted Successfully");
        } else {
          console.error("Failed to delete", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting", error);
      }
      setOpen(false);
    }
  };


    useEffect(() => {
      if (type === "update" || type === "view") {
      router.push(`/semesters/${data.id}?type=${type}`);
  }

    }, [type, data?.id, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    

      {/* Form dialog */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg px-8 py-4 w-[40%] max-w-4xl"
      >
           <button
          onClick={handleCancel}
          className={`relative text-black text-2xl top-[-1%] left-[99%] `}
          aria-label="Close"
        >
          <IoClose />
      </button>
        {type === "create" ? (
              <div className="flex flex-col gap-6">
               

              <TitleHeader
                fontSize="2xl"
                title="Add New Semester"
                className="text-center font-semibold"
              />
            
              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <InputFields
                      label="Semester Name   "
                      name="semesterName"
                      placeholder="Enter the semester"
                      value={formData.semesterName}
                      onChange={handleChange}
                      className="w-full"
                    />
                    {semesterNameError && (
                      <p className="text-red-500 text-sm">{semesterNameError}</p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    <InputFields
                      label="Semester Status   "
                      required={true}
                      input="dropdown"
                      name="status"
                      options={statusOptions}
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full"
                    />
                    {statusError && (
                      <p className="text-red-500 text-sm">{statusError}</p>
                    )}
                  </div>
                </div>
            
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col md:flex-row gap-4">
                    <InputFields
                      name="startDate"
                      label="Start Date  "
                      input="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />
                    <InputFields
                      name="endDate"
                      label="End Date"
                      input="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />

                  </div>
                  <div className="flex justify-around">
                  {dateErrors.startDate && (
                    <p className="text-red-500 text-sm">{dateErrors.startDate}</p>
                  )}
                                      {dateErrors.endDate && (
                      <p className="text-red-500 text-sm">{dateErrors.endDate}</p>
                    )}
                  </div>

            
                  <div className="flex flex-col md:flex-row gap-4">
                    <InputFields
                      name="midStartDate"
                      label="MidTerm Date   "
                      input="date"
                      value={formData.midStartDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />
                    <InputFields
                      name="midEndDate"
                      label="MidTerm End Date  "
                      input="date"
                      value={formData.midEndDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />
                  </div>
                  {dateErrors.midDates && (
                    <p className="text-red-500 text-sm">{dateErrors.midDates}</p>
                  )}
            
                  <div className="flex flex-col md:flex-row gap-4">
                    <InputFields
                      name="finalStartDate"
                      label="FinalTerm Date"
                      input="date"
                      value={formData.finalStartDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />
                    <InputFields
                      name="finalEndDate"
                      label="FinalTerm End Date"
                      input="date"
                      value={formData.finalEndDate}
                      onChange={handleChange}
                      className="w-full md:w-1/2"
                    />
                  </div>
                  {dateErrors.finalDates && (
                    <p className="text-red-500 text-sm">{dateErrors.finalDates}</p>
                  )}
                </div>
              </div>
            
              <div className="flex justify-end gap-4 mt-6">
                <Btns type="primary" title="Cancel" onClick={handleCancel} />
                <Btns type="secondary" title="Add" btnType="submit" />
              </div>
            </div>
            
      )  : (
          type === "delete" && (
            <div >
            <DeleteDialog
              title="Semester"
              object={data.title}
              type="submit"
              onCancel={(e) => {
                e.preventDefault();
                handleCancel();
              }}
            />
            </div>
          )
        )}
      </form>
    </div>
  );
  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  //     {/* Close Button */}
  //     <button
  //       onClick={handleCancel}
  //       className="absolute top-4 right-4 text-black text-2xl"
  //       aria-label="Close"
  //     >
  //       <IoClose />
  //     </button>
  
  //     {/* Form dialog */}
  //     <form
  //       onSubmit={handleSubmit}
  //       className="bg-white rounded-lg shadow-lg p-8 w-[60%] max-w-4xl"
  //     >
  //       {/* Title */}
  //       <h2 className="text-2xl font-semibold text-center mb-6">Add New Semester</h2>
  
  //       {/* Form Fields */}
  //       <div className="flex flex-col gap-6">
  //         {/* Semester Name and Status */}
  //         <div className="flex gap-4">
  //           <div className="w-1/2">
  //             <InputFields
  //               label="Semester Name"
  //               name="semesterName"
  //               placeholder="Enter the semester"
  //               value={formData.semesterName}
  //               onChange={handleChange}
  //               className="w-full"
  //             />
  //             {semesterNameError && (
  //               <p className="text-red-500 text-sm">{semesterNameError}</p>
  //             )}
  //           </div>
  //           <div className="w-1/2">
  //             <InputFields
  //               label="Semester Status"
  //               input="dropdown"
  //               name="status"
  //               options={statusOptions}
  //               value={formData.status}
  //               onChange={handleChange}
  //               className="w-full"
  //             />
  //             {statusError && (
  //               <p className="text-red-500 text-sm">{statusError}</p>
  //             )}
  //           </div>
  //         </div>
  
  //         {/* Dates */}
  //         <div className="grid grid-cols-2 gap-6">
  //           <InputFields
  //             name="startDate"
  //             label="Start Date"
  //             input="date"
  //             value={formData.startDate}
  //             onChange={handleChange}
  //           />
  //           <InputFields
  //             name="endDate"
  //             label="End Date"
  //             input="date"
  //             value={formData.endDate}
  //             onChange={handleChange}
  //           />
  //           <InputFields
  //             name="midStartDate"
  //             label="MidTerm Date"
  //             input="date"
  //             value={formData.midStartDate}
  //             onChange={handleChange}
  //           />
  //           <InputFields
  //             name="midEndDate"
  //             label="MidTerm End Date"
  //             input="date"
  //             value={formData.midEndDate}
  //             onChange={handleChange}
  //           />
  //           <InputFields
  //             name="finalStartDate"
  //             label="FinalTerm Date"
  //             input="date"
  //             value={formData.finalStartDate}
  //             onChange={handleChange}
  //           />
  //           <InputFields
  //             name="finalEndDate"
  //             label="FinalTerm End Date"
  //             input="date"
  //             value={formData.finalEndDate}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         {dateErrors && (
  //           <p className="text-red-500 text-sm">{dateErrors.general}</p>
  //         )}
  //       </div>
  
  //       {/* Buttons */}
  //       <div className="flex justify-end gap-4 mt-6">
  //         <Btns type="primary" title="Cancel" onClick={handleCancel} />
  //         <Btns type="secondary" title="Add" btnType="submit" />
  //       </div>
  //     </form>
  //   </div>
  // );
  
}
