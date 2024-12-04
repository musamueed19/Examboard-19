import { useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";

const courseTypeOptions = [
  { value: "Regular", name: "Regular" },
  { value: "Practical", name: "Practical" },
];
export default function CourseForm({ type, data, setOpen, setRefresh }) {
  const [formData, setFormData] = useState({
    courseTitle: data?.title || "",
    courseCode: data?.course || "",
    courseType: data?.courseType || "Select",
    studentEnrolled: data?.studentEnrollment || 0,
  });

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    setFormError("");

    // Validation For Form Fields of Course
    if (
      formData.courseTitle === "" ||
      formData.courseCode === "" ||
      formData.studentEnrolled == 0
    ) {
      console.log(formData.courseType, "All * Fields are Required:");
      setFormError("All * Fields are Required:");
      return;
    } else if (formData.courseType === "Select") {
      console.log(formData.courseType, "you must select course type");
      setFormError("you must select course type");
      return;
    }

    const bodyData = {
      id: formData.courseCode,
      course_code: formData.courseCode,
      course_title: formData.courseTitle,
      course_type: formData.courseType,
      enrolled_students: +formData.studentEnrolled,
    };
    console.log(bodyData);

    if (type === "create") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/courses/addCourse`,
          bodyData
        )
        .then((response) => {
          setRefresh("New Course Added successfully");
          handleCancel();

          console.log("DATA SENT: " + bodyData.data);
        })
        .catch((error) => {
          console.log("Error Adding Course:" + error.message);
        });
    } else if (type === "update") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/courses/editCourse`,
          bodyData
        )
        .then((response) => {
          // handleSuccess("Course has Updated successfully");
          setRefresh("Course has Updated successfully");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error Adding Course:" + error);
        });
    } else if (type === "delete") {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/courses?id=${data.course}`
        )
        .then((response) => {
          setRefresh("Course has Deleted successfully");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error Adding Course:" + error);
        });
    }
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleCancel() {
    setOpen(false);
  }

  return (
    <form className="w-full px-8 lg:px-16" onSubmit={submitHandler}>
      {type === "update" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader fontSize="xl" title="Edit Course" />
          <div className="space-y-3">
            <InputFields
              type="view"
              inline={true}
              label="Course Code"
              input="text"
              name="courseCode"
              placeholder="Enter course code"
              value={formData.courseCode}
            />
            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
                <InputFields
                  type={type}
                  label="Course Title"
                  input="text"
                  name="courseTitle"
                  placeholder="Enter course title"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
                <InputFields
                  type={type}
                  label="Students Enrolled"
                  input="number"
                  name="studentEnrolled"
                  placeholder="Enter no. of students"
                  value={formData.studentEnrolled}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  type={type}
                  label="Course Type"
                  input="dropdown"
                  name="courseType"
                  value={formData.courseType}
                  options={courseTypeOptions}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {formError && (
            <p className="text-sm text-red-500 font-medium lowercase">
              {formError}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-500 font-medium lowercase">
              {success}
            </p>
          )}
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
                type={type}
                label="Course Code"
                input="text"
                name="courseCode"
                placeholder="Enter course code"
                value={formData.courseCode}
              />
              <InputFields
                type={type}
                label="Course Type"
                input="dropdown"
                name="courseType"
                value={formData.courseType}
                options={courseTypeOptions}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                type={type}
                label="Course Title"
                input="text"
                name="courseTitle"
                placeholder="Enter course title"
                value={formData.courseTitle}
              />

              <InputFields
                type={type}
                label="Students Enrolled"
                input="number"
                name="studentEnrolled"
                placeholder="Enter no. of students"
                value={formData.studentEnrolled}
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
          <TitleHeader fontSize="xl" title="Add Course" />
          <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Course Code"
                input="text"
                name="courseCode"
                placeholder="Enter course code"
                onChange={handleChange}
              />
              <InputFields
                label="Course Type"
                input="dropdown"
                name="courseType"
                options={courseTypeOptions}
                onChange={handleChange}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <InputFields
                label="Course Title"
                input="text"
                name="courseTitle"
                placeholder="Enter course title"
                onChange={handleChange}
              />
              <InputFields
                label="Students Enrolled"
                input="number"
                name="studentEnrolled"
                placeholder="Enter no. of students"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            {formError && (
              <p className="text-sm text-red-500 font-medium lowercase">
                {formError}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-500 font-medium lowercase">
                {success}
              </p>
            )}
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
