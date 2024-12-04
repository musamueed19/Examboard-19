import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TitleHeader from "../common/TitleHeader";
import InputFields from "../common/InputFields";
import Btns from "../common/Btns";
import { useRouter } from "next/navigation";
import DeleteDialog from "../common/DeleteDialog";

export default function AddPaperPatternModal({ setRefresh, semester, type, setOpen, data }) {
  const [formData, setFormData] = useState({
    course_type: data?.courseType || "",
    exam_type: data?.examType || "",
    questions: [{ marks: data?.marks || '', noOfQuestions: data?.quantity || '' }],
  });


  console.log("data", data);
  console.log("formdata", formData);

  const [errorMessages, setErrorMessages] = useState({});
  const router = useRouter();
  const lastQuestionRef = useRef(null);

  const statusOptions = [
    { value: 'Regular' },
    { value: 'Practical' },
  ];

  const examType = [
    { value: 'MidTerm' },
    { value: 'FinalTerm' },
  ];

  const handleChange = (index, field, value) => {
    setErrorMessages('');
    console.log(index, field, value);
    if (type === "update") {
      // For "update", directly modify the specific question data
      setFormData((prev) => ({
        ...prev,
        questions: prev.questions.map((q, i) =>
          // Ensure only the relevant question is updated
          i === 0 ? { ...q, [field]: parseInt(value, 10) || 0 } : q
        ),
      }));
    } else if (type === "create") {
      // For "create", handle changes to multiple questions
      if (index === -1) {
        // For non-array fields like course_type or exam_type
        setFormData((prev) => ({ ...prev, [field]: value }));
      } else {
        const updatedQuestions = [...formData.questions];

        if (!updatedQuestions[index]) {
          console.error(`Invalid index ${index} for questions array`, updatedQuestions);
          return;
        }

        // Parse numeric fields (marks, noOfQuestions)
        updatedQuestions[index][field] =
          (field === "marks" || field === "noOfQuestions")
            ? parseInt(value, 10) || 0
            : value;

        setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
      }
    }
  };


  const handleAddField = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { marks: '', noOfQuestions: '' }],
    }));
    setTimeout(() => {
      if (lastQuestionRef.current) {
        lastQuestionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  };

  const handleRemoveField = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);

    // Remove error for the deleted field
    const updatedErrorMessages = { ...errorMessages };
    delete updatedErrorMessages[index];

    // Reindex error messages to match the updated questions array
    const reindexedErrorMessages = {};
    Object.keys(updatedErrorMessages).forEach((key) => {
      const numericKey = parseInt(key, 10);
      if (numericKey > index) {
        reindexedErrorMessages[numericKey - 1] = updatedErrorMessages[key];
      } else if (numericKey < index) {
        reindexedErrorMessages[numericKey] = updatedErrorMessages[key];
      }
    });

    setErrorMessages(reindexedErrorMessages);
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };


  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const marksSet = new Set();
    const newErrorMessages = {};

    // Check if `exam_type` and `course_type` are provided
    if (!formData.exam_type) {
      newErrorMessages.exam_type = "Please select an Exam Type.";
    }
    if (!formData.course_type) {
      newErrorMessages.course_type = "Please select a Course Type.";
    }

    // Check if `questions` array is valid
    formData.questions.forEach((question, index) => {
      if (!question.marks) {
        newErrorMessages[`marks-${index}`] = "Marks field cannot be empty.";
      }
      if (!question.noOfQuestions) {
        newErrorMessages[`noOfQuestions-${index}`] = "Number of questions cannot be empty.";
      }
    });

    // If there are any errors, update the state and exit
    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }
    let hasDuplicates = false;

    formData.questions.forEach((question, index) => {
      // Exclude fields with empty marks from duplicate checks
      if (question.marks !== "") {
        if (marksSet.has(question.marks)) {
          newErrorMessages[index] = "Duplicate marks found. Each question must have unique marks.";
          hasDuplicates = true;
        } else {
          marksSet.add(question.marks);
        }
      }
    });

    setErrorMessages(newErrorMessages);

    if (hasDuplicates) return;

    try {
      const url = type === "create"
        ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/examType/${semester.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API_URL}/examType/${data.id}`;

      const method = type === "create" ? axios.post : axios.patch;
      const payload = type === "create" ? formData : { noOfQuestions: parseInt(formData.questions[0].noOfQuestions, 10) };

      await method(url, payload);

      const successMessage = type === "create"
        ? "New Exam Paper Setting Added Successfully"
        : "Exam Paper Setting record updated successfully";

      setRefresh(successMessage);
      setOpen(false);
      router.refresh(`/semesters/${semester.id}`);
    } catch (error) {
      // console.error("Error during form submission:", error.response ? error.response.data : error);

      // Check for duplicate entry error from backend
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message.includes("An exam paper already exists with the same semester, exam type, course type, marks, and question quantity. Please ensure that you are not creating duplicates.")
      ) {
        setErrorMessages({ general: "This exam paper setting already exists. Please use unique values." });
      } else if (error.response && error.response.data.message) {
        setErrorMessages({ general: error.response.data.message });
      } else {
        setErrorMessages({ general: "An unexpected error occurred. Please try again." });
      }
    }
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/examType?id=${data.id}`
      );
      setRefresh("Exam Paper Record Deleted Successfully");
      setOpen(false);
      router.refresh(`/semesters/${semester.id}`);
    } catch (error) {
      console.error("Error deleting data:", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    if (type === "update" && data) {
      setFormData({
        course_type: data.course_type,
        exam_type: data.examType,
        questions: data.questions || [{ marks: '', noOfQuestions: '' }],
      });
    }
  }, [type, data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {type === "create" && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-lg w-full max-w-md p-6"
        >
          <TitleHeader fontSize="xl" title="Add Paper Pattern" />
          <div className=" flex justify-between mb-6 mt-6">
            {/* <label className="font-semibold">Semester</label>
            <span>{semester.title}</span> */}
            <InputFields
              inline={true}
              label="Semester"
              type="view"
              value={semester.title}
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Course Type & Exam Type */}
            <div className="flex gap-7 mb-4">
              <div className="flex-1">
                <InputFields
                  label="Course Type"
                  name="course_type"
                  input="dropdown"
                  options={statusOptions}
                  value={formData.course_type}
                  onChange={(name, value) => handleChange(-1, "course_type", value)}
                />
                {errorMessages.course_type && (
                  <p className="text-red-500 text-sm mt-1">{errorMessages.course_type}</p>
                )}
              </div>
              <div className="flex-1">
                <InputFields
                  label="Exam Type"
                  name="exam_type"
                  input="dropdown"
                  options={examType}
                  value={formData.exam_type}
                  onChange={(name, value) => handleChange(-1, "exam_type", value)}
                />
                {errorMessages.exam_type && (
                  <p className="text-red-500 text-sm mt-1">{errorMessages.exam_type}</p>
                )}
              </div>
            </div>

            {/* Questions Section */}
            <div className="overflow-y-auto overflow-x-hidden max-h-60 mb-4">
              {formData.questions.map((question, index) => (
                <div
                  key={index}
                  className="flex flex-col"
                  ref={index === formData.questions.length - 1 ? lastQuestionRef : null}
                >
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="self-end text-red-300 hover:text-red-400"
                    >
                      ✖
                    </button>
                  )}
                  <div className="flex gap-7">
                    <div className="flex-1">
                      <InputFields
                        label={`Marks ${index + 1}`}
                        name={`marks-${index}`}
                        input="number"
                        value={question.marks}
                        onChange={(name, value) =>
                          handleChange(index, "marks", Number(value))
                        }
                        placeholder="Enter marks"
                      />
                      {errorMessages[`marks-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorMessages[`marks-${index}`]}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <InputFields
                        label={`No of Questions ${index + 1}`}
                        name={`noOfQuestions-${index}`}
                        input="number"
                        value={question.noOfQuestions}
                        onChange={(name, value) =>
                          handleChange(index, "noOfQuestions", Number(value))
                        }
                        placeholder="Enter number of questions"
                      />
                      {errorMessages[`noOfQuestions-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorMessages[`noOfQuestions-${index}`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Errors */}
            {errorMessages.general && (
              <div className="text-red-500 text-sm mb-4">{errorMessages.general}</div>
            )}

            {/* Add More Questions Button */}
            <button
              type="button"
              onClick={handleAddField}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add More Questions
            </button>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-4">
              <Btns type="primary" title="Cancel" onClick={handleCancel} />
              <Btns type="secondary" title="Add" btnType="submit" />
            </div>
          </div>
        </form>
      )}


      {type === "update" && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-lg w-full max-w-md p-6"
        >
          <TitleHeader fontSize="xl" title="Edit Paper Pattern" />
          <div className="flex justify-between mb-6 mt-6">
            <label className="font-semibold">Semester</label>
            <span>{semester.title}</span>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-7 mb-4">
              <label className="font-semibold">Course Type</label>
              <span>{data.courseType}</span>
              <label className="font-semibold">Exam Type</label>
              <span>{data.examType}</span>
            </div>

            <div className="overflow-y-auto max-h-60 mb-4">
              <div className="flex items-center gap-7">

                <label className="font-semibold">Marks</label>
                <span>{data.marks}</span>
                <InputFields
                  label={`No of Questions`}
                  name={`noOfQuestions`}
                  input="number"
                  inline={true}
                  value={data.quantity}
                  onChange={(name, value) => handleChange(-1, 'noOfQuestions', value)}
                  placeholder="Enter number of questions"
                />

              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Btns type="primary" title="Cancel" onClick={handleCancel} />
              <Btns type="secondary" title="Update" btnType="submit" />
            </div>
          </div>
        </form>
      )}

      {type === "delete" && (
        <form onSubmit={handleDelete}
          className="bg-white rounded-lg w-full max-w-md p-6">
          <DeleteDialog
            title="Exam Type"
            object={data.title}
            type="submit"
            onCancel={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          />
        </form>
      )}
    </div>
  );
}  