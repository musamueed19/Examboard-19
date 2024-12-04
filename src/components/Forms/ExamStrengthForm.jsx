import { useEffect, useRef, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

const ExamTypeOptions = [
  { value: "Midterm", name: "Midterm" },
  { value: "Finalterm", name: "Finalterm" },
];
export default function ExamStrengthForm({
  type,
  data,
  setOpen,
  setIsVisible,
  setContent,
  setRefresh,
}) {
  // Defining useRef
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    Semester: data?.semester || "",
    Course: data?.course || "",
    ExamType: data?.examType || "",
    id: data?.id || "",
    Students: data?.num_of_students || "",
    ExamDate: data?.date || "",
    semesterTitle: "",
    courseFile: undefined || "",
    semesterId: "",
  });

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths/add`
        )
        .then((response) => {
          handleChange("semesterTitle", response.data.title);
          handleChange("semesterId", response.data.id);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const students = parseInt(formData.Students);
    const bodyData = {
      examType: formData.ExamType || "",
      no_of_students: students || 0,
      date: formData.ExamDate || new Date() || "",
    };

    const formDataObj = new FormData();
    formDataObj.append("id", formData.semesterId);
    formDataObj.append("examType", formData.ExamType);
    if (formData.courseFile) {
      formDataObj.append("file", formData.courseFile);
    }

    console.log([...formDataObj.entries()]);

    if (type === "create") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths/${formData.semesterId}/upload`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          console.log(formData);
          handleCancel();
          setRefresh("New Exam Strength Added successfully");
        })
        .catch((error) => {
          console.log(
            "Error Adding Exam Strength:" + [...formDataObj.entries()]
          );
        });
    } else if (type === "update") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths/${formData.id}`,
          bodyData
        )
        .then((response) => {
          handleCancel();
          setRefresh("Exam Strength has Updated successfully");
        })
        .catch((error) => {
          console.log(bodyData);
        });
    } else if (type === "delete") {
      console.log(formData.id);
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/exam-day-course-wise-strengths?id=${formData.id}`
        )
        .then(() => {
          // console.log(formData);
          handleCancel();
          setRefresh("Exam Strength has Deleted successfully");
        })
        .catch((error) => {
          console.log("Error Deleting Exam Strength:" + error.message);
        });
    }
  }

  // const handleChange = (name, value, files) => {
  //   if (name === "courseFile") {
  //     setFormData((prev) => ({ ...prev, [name]: files[0] }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  // const handleChange = (name, value, files) => {
  //   if (name === "courseFile" && files && files.length > 0) {
  //     setFormData((prev) => ({ ...prev, [name]: files[0] }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  //   console.log(files, files?.[0], name, value);
  // };

  const handleChange = (name, value, files) => {
    if (name === "courseFile" && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] }));
      // fileInputRef.current.value = "";
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(fileInputRef, name, value, files?.[0].name, files?.[0]);
  };

  function handleCancel() {
    setOpen(false);
  }
  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <form className="w-full px-8 lg:px-16" onSubmit={submitHandler}>
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit Exam Strength" />
          <div className="space-y-3">
            <InputFields
              type="view"
              inline={true}
              label="Semester"
              input="text"
              name="Semester"
              value={formData.Semester}
            />

            <InputFields
              type="view"
              inline={true}
              label="Course"
              input="text"
              name="Course"
              value={formData.Course}
            />

            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
                <InputFields
                  type={type}
                  label="Exam Type"
                  input="dropdown"
                  name="ExamType"
                  placeholder="Select Exam Type"
                  value={formData.ExamType}
                  onChange={handleChange}
                  options={ExamTypeOptions}
                />
                <InputFields
                  type={type}
                  label="Students Enrolled"
                  input="number"
                  name="Students"
                  placeholder="Enter no. of students"
                  value={formData.Students}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  type={type}
                  label="Exam Date"
                  input="date"
                  name="ExamDate"
                  value={formData.ExamDate}
                  onChange={handleChange}
                />
              </div>
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
      ) : type === "view" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="View Course" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type="view"
                inline={true}
                label="Semester"
                input="text"
                name="Semester"
                value={formData.Semester}
              />

              <InputFields
                type="view"
                inline={true}
                label="Course"
                input="text"
                name="Course"
                onChange={handleChange}
                value={formData.Course}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                inline={true}
                label="Exam Type"
                input="dropdown"
                name="ExamType"
                placeholder="Select Exam Type"
                value={formData.ExamType}
                onChange={handleChange}
                options={ExamTypeOptions}
              />
              <InputFields
                type={type}
                inline={true}
                label="Students Enrolled"
                input="number"
                name="Students"
                placeholder="Enter no. of students"
                value={formData.Students}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                inline={true}
                label="Exam Date"
                input="date"
                name="ExamDate"
                value={formData.ExamDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns
              type="primary"
              title="Close"
              btnType="button"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Add Exam Strength" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Semester"
                type="view"
                input="text"
                name="Semester"
                placeholder="Enter Semester Title"
                value={formData.semesterTitle}
                onChange={handleChange}
              />
              <InputFields
                label="Exam Type"
                input="dropdown"
                name="ExamType"
                options={ExamTypeOptions}
                value={formData.ExamType}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Upldaod Course File"
                input="file"
                name="courseFile"
                accept=".xlsx, .xls"
                placeholder="Enter course title"
                onChange={handleChange}
                // value={formData.courseFile}
                // ref={fileInputRef}
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
            title="course"
            object={data.course}
            onCancel={handleCancel}
          />
        )
      )}
    </form>
  );
}
