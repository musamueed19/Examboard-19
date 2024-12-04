import { useEffect, useState } from "react";
import Btns from "../common/Btns";
import DeleteDialog from "../common/DeleteDialog";
import InputFields from "../common/InputFields";
import TitleHeader from "../common/TitleHeader";
import axios from "axios";
import { getAll } from "@/lib/Fetcher/fetchAllRecords";

export default function ManageCourseAllocationForm({
  type,
  data = "",
  setOpen,
  setIsVisible,
  setContent,
}) {
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [contribution,setContribution] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    CourseTitle: "",
    Contribution: "",
    Section:"",
    TeacherShare: "",
    coordinator_id: "",
    Role: "",
    AllocatedStudents: "",
  });
  

  // Handle form data changes
  // const handleChange = (name, value) => {
  //   if (name === "coordinator_id") {
  //     const selectedOption = facultyOptions.find((option) => option.id === value);
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: selectedOption ? selectedOption.id : "",
  //     }));
  //   } else if (name === "role") {
      
  //     setFormData((prev) => ({
  //       ...prev,
  //       Role: value ? value:"", // Store role name as string
  //     }));
  //   } else if (name === "CourseTitle") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value || "",  // Update CourseTitle with selected course title
  //     }));
  //   } else if (name === "TeacherShare" || name === "AllocatedStudents") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value || "", // Ensure values are not empty strings
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };
 

  useEffect(() => {
    const fetchCourseAllocationData = async () => {
      try {
        const response = await getAll(`${process.env.NEXT_PUBLIC_BASE_API_URL}/course-allocation/allocateCourse`);
        if (response.success) {
          setFacultyOptions(response.data?.faculties.map((item)=>({
            id:item.id,
            value:item.name,
          }))) 
          setCourses(
            response.data?.courses.map((item) => ({
              value: item.id,
              title: item.title,
              studentEnrollment: item.student_enrollment,
              type: item.type,
            }))
          );
          
          setRoles(response.data?.roles.map((item)=>({
            
            value:item.password,
            category:item.category
          })));
          setContribution(response.data?.courses.map((item)=>({
            value: item.type,
          })))
        }
      } catch (err) {
        console.log("Failed to fetch data. Please try again later.");
      }
    };
  
    fetchCourseAllocationData();
  }, []); // Add an empty dependency array to ensure the effect runs only once on mount.
  


  const handleChange = (name, value) => {
    if (name === "coordinator_id") {
      const selectedOption = facultyOptions.find(
        (option) => option.id === value
      );
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.id : "",
      }));
    }
    else if  (name === "Role") {
      const selectedRole = roles.find((role) => role.value === value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedRole ? selectedRole.value : "",
        
      }));
    }
    else if (name === "Contribution") 
      {
        const selectedCourse = contribution.find((course) => course.value === value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedCourse ? selectedCourse.type : "",
        // AllocatedStudents: selectedCourse ? selectedCourse.studentEnrollment : "",
      }));
      
    
    }
    else if (name === "CourseTitle") {
      const selectedCourse = courses.find((course) => course.value === value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedCourse ? selectedCourse.value : "",
        AllocatedStudents: selectedCourse ? selectedCourse.studentEnrollment : "",
      
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
     // Clear error message when user updates fields
  };

    // const payload = {
    //   course: formData.CourseTitle,
    //   faculty: formData.coordinator_id,
    //   contribution: formData.Contribution,
    //   role: formData.Role,
    //   teacher_share: formData.TeacherShare,
    //   allocated_students: formData.AllocatedStudents,
    // };
    const handleSubmit = async (event) => {
      event.preventDefault();
  
    try {
      if (type === "create") {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/course-allocation/allocateCourse${sectionCoordinators[0]?.id}`, payload);
        handleSuccess("New Course Allocation added successfully!");
      } else if (type === "update") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/course-allocation/editCourse${sectionCoordinators[0]?.id}`,
          payload
        );
        handleSuccess("Course Allocation updated successfully!");
      } else if (type === "delete") {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/courseAllocations?id=${data.id}`);
        handleSuccess("Course Allocation deleted successfully!");
      }
    } catch (error) {
      console.error("Error in course allocation:", error.message);
    }  finally {
      setLoading(false);
    }
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  // Cancel handler
  const handleCancel = () => {
    setOpen(false);
  };

  // Success handler
  const handleSuccess = (message) => {
    setIsVisible(true);
    setContent(message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (<>
    <form onSubmit={handleSubmit} className="w-full px-8 lg:px-16">
      {type === "update" || type === "create" ? (
        <div className="flex flex-col gap-8 w-full py-6">
          <TitleHeader
            fontSize="xl"
            title={type === "update" ? "Edit Course Allocation" : "Allocate Course"}
          />
          <div className="flex flex-col justify-center w-full px-26">
          <div className="flex-col flex px-32 gap-3">
            <div className="flex gap-10 justify-start font-bold">semester: <span className="font-normal">Summer Semester 2024</span></div>
            <div className="flex gap-10 justify-start font-bold">Section: <span className="font-normal">   {formData.Section || "No Title Available"}</span></div>
            <div className="flex gap-10 justify-start font-bold">Allocated Students: <span className="font-normal">    {formData.AllocatedStudents || "N/A"}</span></div>
             </div>
            
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 p-4">
          
              <div className="flex flex-col gap-3">
                <InputFields
                  label="Course Title"
                  input="dropdown"
                  name="CourseTitle"
                  options={courses}
                  value={formData.CourseTitle}
                  onChange={handleChange}
                  placeholder="Select course title"
                />
                <InputFields
                  label="Contribution"
                  input="dropdown"
                  name="Contribution"
                  options={contribution}
                  value={formData.Contribution}
                  placeholder="Enter contribution percentage"
                  onChange={handleChange}
                />
                <InputFields
                  label="Teacher Share"
                  input="number"
                  name="TeacherShare"
                  value={formData.TeacherShare}
                  placeholder="Enter teacher share percentage"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <InputFields
                  label="Faculty "
                  input="dropdown"
                  name="coordinator_id"
                  options={facultyOptions}
                  value={formData.coordinator_id || ""}
                  onChange={handleChange}
                />
                <InputFields
                  label="Role"
                  input="dropdown"
                  name="Role"
                  options={roles}
                  value={formData.Role}
                  onChange={handleChange}
                />
              
              </div>
            </div>
          </div>
          <div className="modalActionBtns">
            <Btns type="primary" title="Cancel" btnType="button" onClick={handleCancel} />
            <Btns type="secondary" title="Save" btnType="submit" />
          </div>
        </div>
      ) : type === "delete" && (
        <DeleteDialog
          Coursetitle="Course Allocation."
          object={
            <div className="text-black font-normal">
              Course{" "}
              <span className="text-red-500 font-semibold">
                ({data.Course})
              </span>{" "}
              allocated to{" "}
              <span className="text-red-500 font-semibold">{data.Faculty}</span>
            </div>
          }
          onCancel={handleCancel}
        />
      )}
    </form></>
  );
}
