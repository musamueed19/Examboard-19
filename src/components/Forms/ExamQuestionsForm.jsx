import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteDialog from "../common/DeleteDialog";
import TitleHeader from "../common/TitleHeader";
import InputFields from "../common/InputFields";
import Btns from "../common/Btns";

export default function ExamQuestionsForm({ type, data, setOpen }) {
  const router = useRouter();

  // Cancel button handler
  function handleCancel() {
    setOpen(false);
  }

  // Redirect based on `type`
  useEffect(() => {
    if (type === "view") router.push(`/examquestions/viewexamquestions`);
    if (type === "allocate") router.push(`/examquestions/allocatequestions`);
  }, [type]);

  // Dropdown options for exam types
  const examOptions = [
    { value: "MidTerm", name: "MidTerm" },
    { value: "FinalTerm", name: "FinalTerm" },
  ];

  // Form data state
  const [formData, setFormData] = useState({
    semester: "Spring Semester 2024",
    exam: "",
    questionFile: null, // Updated for file input handling
  });

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, questionFile: e.target.files[0] }));
  };

  return (
    <div className="w-full px-8 lg:px-16">
      <form className="flex flex-col gap-8 w-full py-6">
        {type === "delete" ? (
          <DeleteDialog
            title="Exam Question"
            object={data?.designation}
            onCancel={handleCancel}
          />
        ) : type === "create" ? (
          <>
            <TitleHeader fontSize="xl" title="Add Question" />
            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              {/* Left Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  label="Semester"
                  input="text"
                  type="view"
                  name="semester"
                  value={formData.semester}
                  onChange={(e) => handleChange("semester", e.target.value)}
                />
                <InputFields
                  label="Exam Type"
                  input="dropdown"
                  name="exam"
                  options={examOptions}
                  value={formData.exam}
                  onChange={(e) => handleChange("exam", e.target.value)}
                />
              </div>
              {/* Right Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  label="Upload File"
                  input="file"
                  name="questionFile"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange} // Use custom file handler
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="modalActionBtns">
              <Btns
                type="primary"
                title="Cancel"
                btnType="button"
                onClick={handleCancel}
              />
              <Btns type="secondary" title="Save" btnType="submit" />
            </div>
          </>
        ) : type === "update" ? (
          <>
            <TitleHeader fontSize="xl" title="Edit Question" />
            <div className="flex flex-col lg:flex-row lg:gap-12 justify-center w-full">
              {/* Left Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  label="Semester"
                  input="text"
                  type="view"
                  name="semester"
                  value={formData.semester}
                  onChange={(e) => handleChange("semester", e.target.value)}
                />
                <InputFields
                  label="Exam Type"
                  input="dropdown"
                  name="exam"
                  options={examOptions}
                  value={formData.exam}
                  onChange={(e) => handleChange("exam", e.target.value)}
                />
              </div>
              {/* Right Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <InputFields
                  label="Upload File"
                  input="file"
                  name="questionFile"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange} // Use custom file handler
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="modalActionBtns">
              <Btns
                type="primary"
                title="Cancel"
                btnType="button"
                onClick={handleCancel}
              />
              <Btns type="secondary" title="Save" btnType="submit" />
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
}
