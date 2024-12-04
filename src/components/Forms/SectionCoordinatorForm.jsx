"use client";
import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SectionCoordinatorForm({
  type,
  data = "",
  setOpen,
  setRefresh,
  setIsVisible,
  setContent,
}) {
  const router = useRouter();
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [semesterDetails, setSemesterDetails] = useState({ id: "", title: "" });
  const [formData, setFormData] = useState({
    sectioncoordinatorTitle: "",
    coordinator_id: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  useEffect(() => {
    // Fetch Faculty and Semester Data
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/addsection`)
      .then((response) => {
        setFacultyOptions(
          response.data.facultyDetails.map((item) => ({
            id: item.id,
            value: item.name,
          }))
        );

        if (response.data.activeSemester) {
          setSemesterDetails({
            id: response.data.activeSemester.id,
            title: response.data.activeSemester.title,
          });
          setFormData((prev) => ({
            ...prev,
            sectioncoordinatorTitle: response.data.activeSemester.title,
          }));
        }
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const handleChange = (name, value) => {
    if (name === "coordinator_id") {
      const selectedOption = facultyOptions.find(
        (option) => option.id === value
      );
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.id : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMessage(""); // Clear error message when user updates fields
  };

  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      router.push("/sectioncoordinator");
      window.location.reload(); // Forces a page reload
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (type === "create") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections/addSection/${semesterDetails.id}`,
          {
            title: formData.sectioncoordinatorTitle,
            coordinator_id: formData.coordinator_id,
          }
        )
        .then(() => {
          setRefresh("New section coordinator added successfully");
          handleCancel();
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === 400 &&
            error.response.data.message === "Section Already Exist"
          ) {
            setErrorMessage("Section already exists.");
          } else {
            console.error("Error adding coordinator:", error);
          }
        });
    } else if (type === "delete") {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/sections?id=${data.section_id}`
        )
        .then(() => {
          setRefresh("Section coordinator deleted successfully");
          handleCancel();
        })
        .catch((error) => console.error("Error deleting coordinator:", error));
    }
  };

  useEffect(() => {
    if (type === "update" || type === "view") {
      router.push(`/sectioncoordinator/${data.id}?type=${type}`);
    }
  }, [type, router]);

  return (
    <form onSubmit={submitHandler} className="w-full px-8 lg:px-12">
      {type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add New Section" />
          <div className="flex flex-col justify-center w-full px-6 gap-5">
            <InputFields
              required={true}
              value={formData.sectioncoordinatorTitle || ""}
              label="Section"
              input="text"
              name="sectioncoordinatorTitle"
              inline={true}
              placeholder="Enter Section name"
              onChange={handleChange}
            />
            {/* {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )} */}
          </div>
          <div className="flex flex-col justify-center w-full px-6 gap-5">
            <InputFields
              required={true}
              inline={true}
              label="Coordinator"
              input="dropdown"
              name="coordinator_id"
              options={facultyOptions}
              value={formData.coordinator_id || ""}
              onChange={handleChange}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Btns
              type="primary"
              title="Cancel"
              btnType="button"
              onClick={handleCancel}
            />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : type === "delete" ? (
        <DeleteDialog
          title="Section Coordinator"
          object={data.coordinator}
          onCancel={handleCancel}
        />
      ) : null}
    </form>
  );
}
