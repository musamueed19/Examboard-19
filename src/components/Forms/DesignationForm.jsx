"use client";
import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

/*const designationOptions = [
  {
    value: "Associate Professor",
    name: "Associate Professor",
  },
  {
    value: "Assistant Professor",
    name: "Assistant Professor",
  },
  {
    value: "Tutor/Instructor",
    name: "Tutor/Instructor",
  },
  {
    value: "Lecturer",
    name: "Lecturer",
  },
];*/

export default function DesignationForm({
  type,
  data,
  setIsVisible,
  setOpen,
  setRefresh,
  setContent,
}) {
  // const [currentDesignation, setCurrentDesignation] = useState(
  //   data?.designation
  // );
  // const [designation, setDesignation] = useState();

  const [formData, setFormData] = useState({
    designation: data?.designation || "",
  });

  function modalHandler(event) {
    event.preventDefault();
    if (type === "create") {
      console.log(designation);
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/designations/`, {
          designation_title: formData.designation,
        })
        .then((response) => {
          setRefresh("New Designation Added Succesfully");
           handleCancel();
        })
        .catch((error) => {
          console.error("Error fetching designation:", error);
        });
    }

    if (type === "update") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/designations/${data.id}`,
          {
            designation_title: formData.designation,
          }
        )
        .then((response) => {
          setRefresh("Designation Updated Succesfully");
          handleCancel();
          // handleSuccess("Designation Updated Succesfully");
        })
        .catch((error) => {
          console.log("Error data did not update", error);
        });
    }

    if (type === "delete") {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/designations?id=${data.id}`
        )
        .then((response) => {
          // handleSuccess("Designation Deleted Succesfully");

          setRefresh("Designation Deleted Succesfully");
          handleCancel();
        })
        .catch((error) => {
          console.log(
            "Error occured specific designation cannot be deleted",
            error
          );
        });
    }
    // router.push('/locations')
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleCancel() {
    setOpen(false);
  }

  return (
    <form onSubmit={modalHandler} className="w-full px-8 lg:px-16">
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit Designation" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                label="Designation"
                required={true}
                input="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Update" btnType="submit" />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add Designation" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Designation"
                required={true}
                input="text"
                name="designation"
                value={formData.designation}
                placeholder="Add new Designation"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : (
        type === "delete" && (
          <DeleteDialog
            title="Designation"
            object={data.designation}
            onCancel={handleCancel}
          />
        )
      )}
    </form>
  );
}
